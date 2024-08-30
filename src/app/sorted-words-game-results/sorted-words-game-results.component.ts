import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sorted-words-game-results',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sorted-words-game-results.component.html',
  styleUrl: './sorted-words-game-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortedWordsGameResultsComponent { }
