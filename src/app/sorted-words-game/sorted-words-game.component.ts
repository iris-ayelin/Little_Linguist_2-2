import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../../shared/model/category';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmExitDialogComponent } from '../confirm-exit-dialog/confirm-exit-dialog.component';
import { ReturnAnswerDialogComponent } from '../return-answer-dialog/return-answer-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-sorted-words-game',
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
  templateUrl: './sorted-words-game.component.html',
  styleUrls: ['./sorted-words-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortedWordsGameComponent implements OnInit {
  @Input() id = '';
  currentCategory?: Category;
  words: { origin: string; target: string }[] = [];
  mixedWords: { word: string; belongsToCurrent: boolean }[] = [];
  currentWordIndex = 0;
  coins = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  readonly confirmDialog = inject(MatDialog);
  readonly answerDialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly categoriesService = inject(CategoriesService);
  readonly gamesService = inject(GamesService);
  isCorrect = false;

  // Track word results
  wordResults: {
    hebrewWord: string;
    guessedWord: string; 
    word: string;
    belongsToCurrent: boolean;
    userSaidYes: boolean;
    isCorrect: boolean;
  }[] = [];
  currentWord: { word: string; belongsToCurrent: boolean } | undefined;
  progressValue: number = 0;
  userGuess?: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const categoryId = +id; 
        this.currentCategory = this.categoriesService.get(categoryId);

        if (this.currentCategory) {
          this.words = this.currentCategory.words;

          // Fetch a random category and select 3 words
          const randomCategory = this.categoriesService.getRandomCategory();
          const randomWords = this.getRandomWords(randomCategory, 6);

          // Mix words from current and random categories
          this.mixedWords = this.shuffleWords([
            ...this.words.slice(0, 6),
            ...randomWords,
          ]);

          this.setNextWord();
        }
      }
    });
  }

  private getRandomWordsFromCategory(
    words: { origin: string; target: string }[],
    count: number
  ): { origin: string; target: string }[] {
    const shuffledWords = [...words].sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, count);
  }

  private getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private getRandomWords(
    category: Category,
    count: number
  ): { origin: string; target: string }[] {
    if (!category || !category.words || category.words.length === 0) return [];
    const shuffledWords = [...category.words].sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, count);
  }

  private shuffleWords(
    words: { origin: string; target: string }[]
  ): { word: string; belongsToCurrent: boolean }[] {
    return words
      .map((word) => ({
        word: word.origin,
        belongsToCurrent: this.words.some(w => w.origin === word.origin),
      }))
      .sort(() => 0.5 - Math.random());
  }

  private setNextWord(): void {
    if (this.currentWordIndex < 6) {  // Limit to 6 words
      this.currentWord = this.mixedWords[this.currentWordIndex];
    } else {
      this.navToLetsPlay();
    }
  }

  checkAnswer(userSaidYes: boolean): void {
    const pointsPerWord = Math.floor(100 / this.shuffleWords.length);
    console.log(this.shuffleWords.length)
    if (!this.currentWord) return;

    const isCorrect = userSaidYes === this.currentWord.belongsToCurrent;

    this.wordResults.push({
      word: this.currentWord.word,
      belongsToCurrent: this.currentWord.belongsToCurrent,
      userSaidYes,
      isCorrect,
      hebrewWord: '', 
      guessedWord: '' 
    });

    this.isCorrect = isCorrect;

    if (isCorrect) {
      this.coins += pointsPerWord; 
      this.correctGuesses++;
    } else {
      this.incorrectGuesses++;
    }

    this.openAnswerDialog(isCorrect);

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
      isCorrect,
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

  private navToLetsPlay(): void {
    this.closeDialogs(); // Close any open dialogs before navigating
    this.router.navigate(['sorted-words-game-results']); // Navigate to the 'lets-play' page
  }

  private closeDialogs(): void {
     this.confirmDialog.closeAll();
     this.answerDialog.closeAll();
  }
}