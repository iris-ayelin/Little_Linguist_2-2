import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/model/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-word-sorter-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './word-sorter-game.component.html',
  styleUrl: './word-sorter-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordSorterGameComponent implements OnInit{ 
  dataSource : Category[] = [];
  @Input()
  id = ""; 
  currentCategory?: Category;

  constructor(private CategoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.currentCategory = this.CategoriesService.get(parseInt(this.id))
  }
  
}
