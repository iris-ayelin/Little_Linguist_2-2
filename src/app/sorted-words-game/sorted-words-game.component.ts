// import { CommonModule } from '@angular/common';
// import {
//   ChangeDetectionStrategy,
//   Component,
//   Input,
//   OnInit,
//   inject,
// } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CategoriesService } from '../services/categories.service';
// import { Category } from '../../shared/model/category';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatIconModule } from '@angular/material/icon';
// import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDividerModule } from '@angular/material/divider';
// import { ConfirmExitDialogComponent } from '../confirm-exit-dialog/confirm-exit-dialog.component';
// import { ReturnAnswerDialogComponent } from '../return-answer-dialog/return-answer-dialog.component';
// import { MatDialog } from '@angular/material/dialog';
// import { GamesService } from '../services/games.service';

// @Component({
//   selector: 'app-sorted-words-game',
//   standalone: true,
//   imports: [
//     CommonModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatProgressBarModule,
//     MatIconModule,
//     FormsModule,
//     MatButtonModule,
//     MatDividerModule,
//     ConfirmExitDialogComponent,
//     ReturnAnswerDialogComponent,
//   ],
//   templateUrl: './sorted-words-game.component.html',
//   styleUrls: ['./sorted-words-game.component.css'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class SortedWordsGameComponent implements OnInit {

//   // backend default paramerters
//   @Input() id = '';
//   words: { origin: string; target: string }[] = [];
//   categories: Category[] = [];
//   selectedCategory: any = [];
//   shuffledWords: ({ origin: string; target: string} & { belongsToCurrent: boolean })[] = [];

//   //check answer parameters / game parameters
//   currentWordIndex = 0;
//   coins = 0;
//   correctGuesses = 0;
//   incorrectGuesses = 0;
//   isCorrect = false;
//   currentWord: { origin: string; target: string} & { belongsToCurrent: boolean } | undefined;
//   progressValue: number = 0;
//   userGuess?: string;

//   // injects
//   readonly confirmDialog = inject(MatDialog);
//   readonly answerDialog = inject(MatDialog);
//   readonly router = inject(Router);
//   readonly route = inject(ActivatedRoute);
//   readonly gamesService = inject(GamesService);

//   //game result parameters
//   wordResults: {
//     word: string;
//     guessedWord: string,
//     hebrewWord: string;
//     belongsToCurrent: boolean;
//     isCorrect: boolean;
//   }[] = [];

//   constructor(private categoriesService: CategoriesService) {}

//   ngOnInit(): void {
//     // get page with id category
//     this.route.paramMap.subscribe((params) => {
//       const id = params.get('id');

//       //set current selected and random category
//       if (id) {
//         const categoryId = +id;
//         const categories = this.categoriesService.list();
//         this.selectedCategory = this.categoriesService.get(categoryId);
//         if (categories.length == categoryId) {
//           categories.splice(categoryId - 1, 1);
//         } else {
//           categories.splice(categoryId, 1);
//         }
//         const selectedCategoryWords = this.categoriesService.getRandomWordsFromCategory(categoryId, 3);
//         const randomCategory = this.categoriesService.getRandomCategory(categories);
//         const randomCategoryWords = this.categoriesService.getRandomWordsFromCategory(randomCategory.id,3);
//         const selectedGameWords = [...selectedCategoryWords, ...randomCategoryWords];
//         this.shuffledWords = this.shuffleWords(selectedGameWords, selectedCategoryWords);
//       }
//       // move to next word
//       this.setNextWord();
//     });
//   }

//   // function to reorder the selected words
//   private shuffleWords(
//     words: { origin: string; target: string}[],
//     categoryWords: { origin: string; target: string}[]
//   ): ({ origin: string; target: string} & { belongsToCurrent: boolean })[] {
//     return words.map(word => ({
//       ...word,
//       belongsToCurrent: categoryWords.some(categoryWord => categoryWord.origin === word.origin)
//     }))
//     .sort(() => 0.5 - Math.random());
//   }

//   // set new word after user submit answer
//   private setNextWord(): void {
//     if (this.currentWordIndex <= 6) {
//       this.currentWord = this.shuffledWords[this.currentWordIndex];
//     } else {
//       this.navToLetsPlay();
//     }
//   }

//   // check user answer
//   checkAnswer(userAnswer: boolean): void {
//     if (!this.currentWord) return;
//     const isCorrect = userAnswer === this.currentWord.belongsToCurrent;
//     this.wordResults.push({
//       word: this.currentWord.origin,
//       guessedWord: this.currentWord.origin,
//       hebrewWord: this.currentWord.target,
//       belongsToCurrent: this.currentWord.belongsToCurrent,
//       isCorrect,
//     });

//     this.isCorrect = isCorrect;
//     if (isCorrect) { 
//       this.coins += Math.round(100/6);
//       this.correctGuesses++;
//     } else {
//       this.incorrectGuesses++;
//     }
//     this.openAnswerDialog(isCorrect);
//     this.currentWordIndex++;
//     if(this.currentWordIndex >= 6) {
//       this.navWithResultData()
//     }else {
//       this.setNextWord();
//     }
    

//   }

//   openConfirmDialog(): void {
//     this.confirmDialog.open(ConfirmExitDialogComponent);
//   }

//   openAnswerDialog(isCorrect: boolean): void {
//     const dialogData = {
//       feedbackMessage: isCorrect ? 'Correct!' : 'Incorrect!',
//       isCorrect,
//     };

//     this.answerDialog.open(ReturnAnswerDialogComponent, {
//       data: dialogData,
//       width: '80vw',
//       maxWidth: '350px',
//       height: 'auto',
//     });
//   }

//   exitGame(): void {
//     this.openConfirmDialog();
//   }

//   get progress(): number {
//     return (this.currentWordIndex / (this.shuffledWords.length - 1)) * 100;
//   }

//   private navToLetsPlay(): void {
//     this.closeDialogs();
//     this.router.navigate(['/lets-play']);
//   }

//   private closeDialogs(): void {
//     this.confirmDialog.closeAll();
//     this.answerDialog.closeAll();
//   }

//   navWithResultData(): void {
//     this.gamesService.setResults(
//       this.wordResults,
//       this.correctGuesses,
//       this.incorrectGuesses,
//       this.coins
//     );
//     this.router.navigate(['/sorted-words-game-results']);
//   }
// }