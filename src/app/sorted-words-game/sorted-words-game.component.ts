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
  words: { origin: string; target: string }[] = [];
  categories: Category[] = [];
  selectedCategory: any = [];
  shuffledWords: ({ origin: string; target: string} & { belongsToCurrent: boolean })[] = [];
  currentWordIndex = 0;
  coins = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  readonly confirmDialog = inject(MatDialog);
  readonly answerDialog = inject(MatDialog);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly gamesService = inject(GamesService);
  isCorrect = false;

  wordResults: {
    hebrewWord: string;
    guessedWord: string;
    word: string;
    belongsToCurrent: boolean;
    userSaidYes: boolean;
    isCorrect: boolean;
  }[] = [];

  currentWord: { origin: string; target: string} & { belongsToCurrent: boolean } | undefined;
  progressValue: number = 0;
  userGuess?: string;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const categoryId = +id;
        const categories = this.categoriesService.list();
        this.selectedCategory = this.categoriesService.get(categoryId);
        if (categories.length == categoryId) {
          categories.splice(categoryId - 1, 1);
        } else {
          categories.splice(categoryId, 1);
        }
        const selectedCategoryWords = this.categoriesService.getRandomWordsFromCategory(categoryId, 3);
        const randomCategory = this.categoriesService.getRandomCategory(categories);
        const randomCategoryWords = this.categoriesService.getRandomWordsFromCategory(randomCategory.id,3);
        const selectedGameWords = [...selectedCategoryWords, ...randomCategoryWords];
        this.shuffledWords = this.shuffleWords(selectedGameWords, selectedCategoryWords);
      }
      this.setNextWord();
    });
  }

  private shuffleWords(
    words: { origin: string; target: string}[],
    categoryWords: { origin: string; target: string}[]
  ): ({ origin: string; target: string} & { belongsToCurrent: boolean })[] {
    return words.map(word => ({
      ...word,
      belongsToCurrent: categoryWords.some(categoryWord => categoryWord.origin === word.origin)
    }))
    .sort(() => 0.5 - Math.random());
  }

  private setNextWord(): void {
    if (this.currentWordIndex < 6) {
      this.currentWord = this.shuffledWords[this.currentWordIndex];
    } else {
      this.navToLetsPlay();
    }
  }

  checkAnswer(userSaidYes: boolean): void {
    const pointsPerWord = Math.floor(100 / this.shuffleWords.length);
    console.log(this.shuffleWords.length);
    if (!this.currentWord) return;

    const isCorrect = userSaidYes === this.currentWord.belongsToCurrent;

    this.wordResults.push({
      word: this.currentWord.origin,
      belongsToCurrent: this.currentWord.belongsToCurrent,
      userSaidYes,
      isCorrect,
      hebrewWord: '',
      guessedWord: '',
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
    this.closeDialogs();
    this.router.navigate(['sorted-words-game-results']);
  }

  private closeDialogs(): void {
    this.confirmDialog.closeAll();
    this.answerDialog.closeAll();
  }
}