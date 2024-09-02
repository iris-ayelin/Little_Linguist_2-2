import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '../services/games.service';

interface WordResult {
  hebrewWord: string;
  guessedWord: string;
  isCorrect: boolean;
}


@Component({
  selector: 'app-sorted-words-game-results',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sorted-words-game-results.component.html',
  styleUrl: './sorted-words-game-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortedWordsGameResultsComponent implements OnInit{
  correctCount: number = 0;
  incorrectCount: number = 0;
  coins: number = 0;
  displayedColumns: string[] = ['hebrewWord', 'guessedWord', 'status'];
  dataSource: WordResult[] = [];

  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit(): void {
    this.correctCount = this.gamesService.getCorrectAnswers();
    this.incorrectCount = this.gamesService.getIncorrectAnswers();
    this.coins = this.gamesService.getCoins();
    this.dataSource = this.gamesService.getResults();
    console.log(this.dataSource)
    if (this.coins > 100) {
      this.coins = 100;
    } else {
      this.coins;
    }
  }

  play_again() {
    this.router.navigate(['/lets-play']);
  }
}

