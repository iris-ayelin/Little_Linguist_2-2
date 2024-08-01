import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { GameProfile } from '../../shared/model/games';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent implements OnInit {
  @Input()
  selectedCategory?: Category;

  categories: Category[] = [];

  constructor(
    public categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<GameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GameProfile,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.categoriesService.list();
  }

  letsPlay() {
    if (this.selectedCategory) {
      this.dialogRef.close();
      this.router.navigate([`${this.data.gameUrl}`, this.selectedCategory.id]);
    }
  }
}
