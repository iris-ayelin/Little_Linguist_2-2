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
  gamesPlayedThisMonth = 0;
  remainingGamesForChallenge = 0;
  mostFrequentCategory: string | null = null;
  mostFrequent: any;
  categoriesService = inject(CategoriesService);
  totalCategories = 0;
  categoriesNotLearned = 0;
  gameTarget = 20;
  gameResults: GameResult[] = [];
  streakCount = 0;
  percentageCategoriesLearned = 0;

  constructor(private gameResultService: GameResultService) {}

  ngOnInit(): void {
    this.getGameStreak();
    this.loadPlayerData();
    this.loadMostFrequentCategory();
  }

  private async loadPlayerData(): Promise<void> {
    const gameResults: GameResult[] = await this.gameResultService.list();
    this.calculateMetrics(gameResults);
  }

  private async calculateMetrics(gameResults: GameResult[]): Promise<void> {
    if (!gameResults.length) return;

    const currentDate = Timestamp.now().toDate();
    this.gamesPlayed = gameResults.length;
    this.points = gameResults.reduce((sum, result) => sum + result.points, 0);

    const allCategories = await this.categoriesService.getCategories();
    this.totalCategories = allCategories.size;

    const categoriesLearnedSet = new Set(
      gameResults.map((result) => result.categoryId)
    );
    this.categoriesLearned = categoriesLearnedSet.size;

    this.categoriesNotLearned = this.totalCategories - this.categoriesLearned;

    if (this.totalCategories > 0) {
      this.percentageCategoriesLearned =
        (this.categoriesLearned / this.totalCategories) * 100;
    }

    const perfectGames = gameResults.filter(
      (result) => result.points === 100
    ).length;
    this.perfectGamesPercentage = (perfectGames / this.gamesPlayed) * 100;

    const datesPlayed = gameResults.map((result) => result.date.toDate());
    this.daysStrike = this.calculateDaysStrike(datesPlayed, currentDate);
  }

  private calculateDaysStrike(datesPlayed: Date[], currentDate: Date): number {
    const sortedDates = datesPlayed.sort((a, b) => b.getTime() - a.getTime());
    let strikeCount = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diffInDays =
        (sortedDates[i - 1].getTime() - sortedDates[i].getTime()) /
        (1000 * 3600 * 24);
      if (diffInDays === 1) {
        strikeCount++;
      } else {
        break;
      }
    }

    return strikeCount;
  }

  private async loadMostFrequentCategory(): Promise<void> {
    const gameResults: GameResult[] = await this.gameResultService.list();

    const mostFrequentCategoryId = this.getMostFrequentCategory(gameResults);

    if (mostFrequentCategoryId) {
      const category = await this.categoriesService.get(mostFrequentCategoryId);
      this.mostFrequentCategory = category ? category.name : null;
    }
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

  async loadGamesThisMonth() {
    this.gameResults = await this.gameResultService.getGamesThisMonth();
    this.gamesPlayedThisMonth = this.gameResults.length;
  }

  async getGameStreak() {
    const now = new Date();
    const currentDate = new Date(now);

    currentDate.setDate(now.getDate() - 1);
    currentDate.setHours(0, 0, 0, 0);

    const gameResults: GameResult[] = await this.gameResultService.list();

    function firestoreTimestampToDate(timestamp: {
      seconds: number;
      nanoseconds: number;
    }): Date {
      return new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
      );
    }

    let foundGame = true;

    while (foundGame) {
      const hasGame = gameResults.some((result) => {
        const gameDate: Date = firestoreTimestampToDate(result.date);
        gameDate.setHours(0, 0, 0, 0);
        return gameDate.getTime() === currentDate.getTime();
      });

      if (hasGame) {
        this.streakCount++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        foundGame = false;
      }
    }
  }
}
