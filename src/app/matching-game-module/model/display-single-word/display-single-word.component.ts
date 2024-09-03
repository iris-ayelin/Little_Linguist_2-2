import { Component, inject, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';
import { Category } from '../../../../shared/model/category';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export enum WordStatus {
  disabled = 'disabled',
  selected = 'selected',
  normal = 'normal',
}

@Component({
  selector: 'app-display-single-word',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './display-single-word.component.html',
  styleUrl: './display-single-word.component.css',
})
export class DisplaySingleWordComponent implements OnInit {
  @Input() id = '';
  currentCategory?: Category;
  words: { origin: string; target: string }[] = [];
  currentWordIndex = 0;
  originWord: string | null = null;
  userGuess = '';
  isValidGuess = true;
  coins = 0;
  correctGuesses = 0;
  incorrectGuesses = 0;
  router = inject(Router);
  categoriesService = inject(CategoriesService);
  isCorrect = false;
  originWordsArray: any;
  targetWordsArray: any;
  categoryId = 1;

  ngOnInit(): void {
    this.setRandomWords(this.categoryId);
  }

  setRandomWords(categoryId: number) {
    this.currentCategory = this.categoriesService.get(categoryId);

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
