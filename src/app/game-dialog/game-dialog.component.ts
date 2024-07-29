import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { GameProfile } from '../../shared/model/games';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    public CategoriesService : CategoriesService,
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public selectedGame: GameProfile
    ) {}

  ngOnInit() {
    this.categories = this.CategoriesService.list()
  }

   
  

  //   @Inject(MAT_DIALOG_DATA) public data: { categories: Category[] }
  // ) {
  //   this.categories = data.categories;
  // }

  /*selectedGame(category: Category): void {
    this.dialogRef.close(category);
  }*/
}
