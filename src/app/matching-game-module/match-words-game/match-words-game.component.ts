import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Category } from '../../../shared/model/category';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmExitDialogComponent } from '../../confirm-exit-dialog/confirm-exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from '../../services/categories.service';
import { DisplaySingleWordComponent } from '../model/display-single-word/display-single-word.component';



@Component({
  selector: 'app-match-words-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './match-words-game.component.html',
  styleUrl: './match-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchWordsComponent implements OnInit {
  @Input()
  id = '';
  currentCategory?: Category;

  confirmDialog = inject(MatDialog);
  //randomWords = inject(DisplaySingleWordComponent)

  constructor(private CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.currentCategory = this.CategoriesService.get(parseInt(this.id))
    console.log(this.id)
    //this.randomWords(this.id)

  }
  
  openConfirmDialog(): void {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }
  exitGame(): void {
    this.openConfirmDialog();
  }

}

