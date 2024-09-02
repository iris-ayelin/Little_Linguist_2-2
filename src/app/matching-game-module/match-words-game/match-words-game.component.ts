import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Category } from '../../../shared/model/category';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmExitDialogComponent } from '../../confirm-exit-dialog/confirm-exit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor() {}

  ngOnInit(): void {

  }
  
  openConfirmDialog(): void {
    this.confirmDialog.open(ConfirmExitDialogComponent);
  }
  exitGame(): void {
    this.openConfirmDialog();
  }

}

