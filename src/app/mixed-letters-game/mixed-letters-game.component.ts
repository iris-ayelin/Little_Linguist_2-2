import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-mixed-letters-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mixed-letters-game.component.html',
  styleUrl: './mixed-letters-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersGameComponent implements OnInit{ 
  @Input()
  id = ""; 
  currentCategory?: Category;

  constructor(private CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.currentCategory = this.CategoriesService.get(parseInt(this.id))
  }
  
}
