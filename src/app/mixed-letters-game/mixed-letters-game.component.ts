import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ConfirmExitDialogComponent } from '../confirm-exit-dialog/confirm-exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ReturnAnswerDialogComponent } from '../return-answer-dialog/return-answer-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-mixed-letters-game',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    ConfirmExitDialogComponent,
    ReturnAnswerDialogComponent,
  ],
  templateUrl: './mixed-letters-game.component.html',
  styleUrls: ['./mixed-letters-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersGameComponent implements OnInit {
  @Input() id = ''
  currentCategory?: Category;
  words: { origin: string; target: string }[] = [];
  currentWordIndex = 0;
  originWord: string | null = null;
  userGuess = '';
  isValidGuess = true;
  coins = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  confirmDialog = inject(MatDialog);
  answerDialog = inject(MatDialog);
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  gamesService = inject(GamesService);
  isCorrect = false;

  wordResults: {
    hebrewWord: string;
    guessedWord: string;
    isCorrect: boolean;
  }[] = [];

  pattern = '^[a-zA-Z ]*$';
  pointsPerWord?: number;
  totalPoints?: number;
  extraPoints?: number;

  async ngOnInit(): Promise<void> {
    if (this.id) {
      const categoryId = +this.id;
        // Wait for the category to be fetched
        this.currentCategory = await this.categoriesService.get(this.id);
  
        if (this.currentCategory) {
          this.words = this.currentCategory.words;
  
          this.pointsPerWord = Math.ceil(100 / this.words.length);
          this.totalPoints = this.pointsPerWord;
  
          this.extraPoints = this.totalPoints - 100;
          this.setNextWord();
        }
      }}


  private setNextWord(): void {
    if (this.currentWordIndex < this.words.length) {
      const currentWord = this.words[this.currentWordIndex];
      let scrambledWord = this.scrambleWord(currentWord.origin);

      if (scrambledWord === currentWord.origin) {
        scrambledWord = this.scrambleWord(currentWord.origin);
        this.scrambleWord(currentWord.origin);
      }

      this.originWord = scrambledWord;
    } else {
      this.navWithResultData();
    }
  }

  private scrambleWord(word: string): string {
    const scrambled = word.split('');
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }
    return scrambled.join('');
  }

  validateEnglishLetters(value: string): void {
    this.isValidGuess = /^[a-zA-Z ]*$/.test(value);
  }

  checkGuess(): void {
    if (!this.isValidGuess) {
      return;
    }

    const currentWord = this.words[this.currentWordIndex];
    this.isCorrect =
      this.userGuess.toLowerCase() === currentWord.origin.toLowerCase();

    const pointsEarned = this.pointsPerWord || 0;

    if (this.isCorrect) {
      this.coins += pointsEarned;
      this.correctGuesses++;
    } else {
      this.incorrectGuesses++;
    }

    this.wordResults.push({
      hebrewWord: currentWord.target,
      guessedWord: this.userGuess,
      isCorrect: this.isCorrect,
    });

    this.openAnswerDialog(this.isCorrect);
    this.userGuess = '';
    this.currentWordIndex++;
    this.setNextWord();
  }

  resetForm(): void {
    this.userGuess = '';
  }

  openConfirmDialog(): void {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }

  openAnswerDialog(isCorrect: boolean): void {
    const dialogData = {
      feedbackMessage: isCorrect ? 'Correct!' : 'Incorrect!',
      isCorrect: isCorrect,
    };

    this.answerDialog.open(ReturnAnswerDialogComponent, {
      data: dialogData,
      width: '80vw',
      maxWidth: '350px',
      height: 'auto',
    });
  }

  exitGame(): void {
    this.openConfirmDialog();
  }

  get progress(): number {
    return (this.currentWordIndex / this.words.length) * 100;
  }

  navWithResultData(): void {
    this.gamesService.setResults(
      this.wordResults,
      this.correctGuesses,
      this.incorrectGuesses,
      this.coins
    );

    this.router.navigate(['/mixed-letters-game-results']);
  }
}
