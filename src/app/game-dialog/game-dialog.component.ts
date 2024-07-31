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
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, RouterLink],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory?: Category;

  constructor(
    public categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameProfile

  ) { }

  ngOnInit() {
    this.categories = this.categoriesService.list();
  }

  letsPlay() {
    this.dialogRef.close({ game: this.data, category: this.selectedCategory });
    
  }
}
