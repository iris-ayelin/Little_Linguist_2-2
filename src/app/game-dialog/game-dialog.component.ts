import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent { 
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: Category[] }
  ) {
    this.categories = data.categories;
  }

  selectCategory(category: Category): void {
    this.dialogRef.close(category);
  }
}
