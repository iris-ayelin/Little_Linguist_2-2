import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
  styleUrl: './match-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchWordsComponent implements OnInit {
  @Input() id = '';
  words: { origin: string; target: string }[] = [];
  currentCategory?: Category;
  originWordsArray: any;
  targetWordsArray: any;
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  confirmDialog = inject(MatDialog);
  //randomWords = inject(DisplaySingleWordComponent)

  constructor() {}

  ngOnInit(): void {
    this.currentCategory = this.categoriesService.get(parseInt(this.id))
    this.setRandomWords()
  }

  openConfirmDialog(): void {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }
  exitGame(): void {
    this.openConfirmDialog();
  }

  setRandomWords() {
    let categoryId = parseInt(this.id)
    this.words = this.categoriesService.getRandomWordsFromCategory(
      categoryId,
      5
    );
    this.originWordsArray = this.words
      .map((word) => word.origin)
      .sort(() => 0.5 - Math.random());
    this.targetWordsArray = this.words
      .map((word) => word.target)
      .sort(() => 0.5 - Math.random());

    return(this.targetWordsArray, this.originWordsArray)
  }
}