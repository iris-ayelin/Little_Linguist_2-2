import { Component, OnInit } from '@angular/core';
import { GameResultService, GameResult } from '../services/game-result.service';
import { Timestamp } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  gamesPlayed = 0;
  points = 0;
  categoriesLearned = 0;
  highestScoreGame = '';
  perfectGamesPercentage = 0;
  daysStrike = 0;
  gamesThisMonth = 0;
  remainingGamesForChallenge = 0;

  constructor(private gameResultService: GameResultService) {}

  ngOnInit(): void {
    this.loadPlayerData('playerId123'); 
  }

  async loadPlayerData(playerId: string) {
    try {
      const gameResults: GameResult[] = await this.gameResultService.list(playerId);
      this.calculateMetrics(gameResults);
    } catch (error) {
      console.error('Error loading game results:', error);
    }
  }

  calculateMetrics(gameResults: GameResult[]) {
    if (gameResults.length === 0) {
      return;
    }

    const currentDate = Timestamp.now().toDate();

    this.gamesPlayed = gameResults.length;
    this.points = 200

    const uniqueCategories = new Set(gameResults.map(result => result.categoryId));
    this.categoriesLearned = uniqueCategories.size;

    this.highestScoreGame = 'Mixed Letters';

    const perfectGames = gameResults.filter(result => result.points === 100).length;
    this.perfectGamesPercentage = (perfectGames / this.gamesPlayed) * 100;

    const datesPlayed = gameResults.map(result => result.date.toDate());
    this.daysStrike = this.calculateDaysStrike(datesPlayed, currentDate);

    this.gamesThisMonth = gameResults.filter(result =>
      result.date.toDate().getMonth() === currentDate.getMonth() &&
      result.date.toDate().getFullYear() === currentDate.getFullYear()
    ).length;

    this.remainingGamesForChallenge = Math.max(20 - this.gamesThisMonth, 0);
  }

  calculateDaysStrike(datesPlayed: Date[], currentDate: Date): number {
    const sortedDates = datesPlayed.sort((a, b) => b.getTime() - a.getTime());
    let strikeCount = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diffInTime = sortedDates[i - 1].getTime() - sortedDates[i].getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      if (diffInDays === 1) {
        strikeCount++;
      } else {
        break; // Streak is broken
      }
    }

    return strikeCount;
  }
}