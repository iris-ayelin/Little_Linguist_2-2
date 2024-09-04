import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { Category } from '../../../shared/model/category';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmExitDialogComponent } from '../../confirm-exit-dialog/confirm-exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-match-words-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './match-words-game.component.html',
  styleUrls: ['./match-words-game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchWordsComponent implements OnInit {
  @Input() id = '';
  words: { origin: string; target: string }[] = [];
  currentCategory?: Category;
  originWordsArray: string[] = [];
  targetWordsArray: string[] = [];
  selectedOriginWord: string | null = null;
  selectedTargetWord: string | null = null;
  matchedWords: Set<string> = new Set();
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  confirmDialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id));
    this.setRandomWords();
  }

  openConfirmDialog(): void {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }
  
  exitGame(): void {
    this.openConfirmDialog();
  }

  setRandomWords() {
    const categoryId = parseInt(this.id);
    this.words = this.categoriesService.getRandomWordsFromCategory(categoryId, 5);
    this.originWordsArray = this.words.map(word => word.origin).sort(() => 0.5 - Math.random());
    this.targetWordsArray = this.words.map(word => word.target).sort(() => 0.5 - Math.random());
  }

  selectOriginWord(word: string) {
    console.log('Origin word clicked:', word);
    this.selectedOriginWord = word;
    this.checkMatch();
  }

  selectTargetWord(word: string) {
    console.log('Target word clicked:', word);
    this.selectedTargetWord = word;
    this.checkMatch();
  }

  checkMatch() {
    if (!this.selectedOriginWord || !this.selectedTargetWord) return;

    console.log('Checking match between:', this.selectedOriginWord, 'and', this.selectedTargetWord);

    const matchedPair = this.words.find(
      word => word.origin === this.selectedOriginWord && word.target === this.selectedTargetWord
    );

    if (matchedPair) {
      console.log('Match found:', matchedPair);
      this.matchedWords.add(this.selectedOriginWord);
      this.selectedOriginWord = null;
      this.selectedTargetWord = null;
      this.cdr.markForCheck();
    } else {
      console.log('No match found.');
    }
  }

  isMatched(word: string): boolean {
    return this.matchedWords.has(word);
  }
}
