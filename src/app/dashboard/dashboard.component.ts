import { Component, OnInit, inject } from '@angular/core';
import { GameResultService, GameResult } from '../services/game-result.service';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  gamesPlayed = 0;
  points = 0;
  categoriesLearned = 0;
  highestScoreGame = 'Mixed Letters';
  perfectGamesPercentage = 0;
  daysStrike = 0;
  gamesThisMonth = 0;
  remainingGamesForChallenge = 0;
  mostFrequentCategory: string | null = null;
  mostFrequent: any;
  categoriesService = inject(CategoriesService);
  totalCategories = 0;
  categoriesNotLearned = 0;




  constructor(private gameResultService: GameResultService) {}

  ngOnInit(): void {
    this.loadPlayerData();
    this.getLastMonthStats();
    this.loadMostFrequentCategory();

  }

  private async loadPlayerData(): Promise<void> {
    const gameResults: GameResult[] = await this.gameResultService.list();
    this.calculateMetrics(gameResults);
  }

  private calculateMetrics(gameResults: GameResult[]): void {
    if (!gameResults.length) return;

    const currentDate = Timestamp.now().toDate();
    this.gamesPlayed = gameResults.length;
    this.points = gameResults.reduce((sum, result) => sum + result.points, 0);
    this.categoriesLearned = new Set(gameResults.map(result => result.categoryId)).size;

    const perfectGames = gameResults.filter(result => result.points === 100).length;
    this.perfectGamesPercentage = (perfectGames / this.gamesPlayed) * 100;

    const datesPlayed = gameResults.map(result => result.date.toDate());
    this.daysStrike = this.calculateDaysStrike(datesPlayed, currentDate);
    this.gamesThisMonth = gameResults.filter(result => {
      const date = result.date.toDate();
      return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
    }).length;

    this.remainingGamesForChallenge = Math.max(20 - this.gamesThisMonth, 0);
  }

  private calculateDaysStrike(datesPlayed: Date[], currentDate: Date): number {
    const sortedDates = datesPlayed.sort((a, b) => b.getTime() - a.getTime());
    let strikeCount = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diffInDays = (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) / (1000 * 3600 * 24);
      if (diffInDays === 1) {
        strikeCount++;
      } else {
        break;
      }
    }

    return strikeCount;
  }

  private async getLastMonthStats(): Promise<void> {
    const points = await this.gameResultService.list();
    console.log(points);
  }

  private async loadMostFrequentCategory(): Promise<void> {
    const gameResults: GameResult[] = await this.gameResultService.list();
    this.mostFrequentCategory = this.getMostFrequentCategory(gameResults);
  }

  private async loadTotalCategories(): Promise<void> {
    const allCategories = await this.categoriesService.get
    this.totalCategories = allCategories.length;

    this.categoriesNotLearned = this.totalCategories - this.categoriesLearned;
  }


  private getMostFrequentCategory(gameResults: GameResult[]): string | null {
    const categoryCount: { [key: string]: number } = {};

    for (const result of gameResults) {
      const categoryId = result.categoryId;
      categoryCount[categoryId] = (categoryCount[categoryId] || 0) + 1;
    }

    let maxCount = 0;
    let mostFrequent: string | null = null;

    for (const [categoryId, count] of Object.entries(categoryCount)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = categoryId;
      }
    }

    return mostFrequent;
  }
}
