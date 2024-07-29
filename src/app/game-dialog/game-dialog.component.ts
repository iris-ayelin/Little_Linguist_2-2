import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';
import { GameProfile } from '../../shared/model/games';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-dialog.component.html',
  styleUrls: ['./game-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    public CategoriesService : CategoriesService,
    public dialogRef: MatDialogRef<GameDialogComponent>,
    ) {}

  ngOnInit() {
    this.categories = this.CategoriesService.list()
  }
}
