import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-match-words-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './match-words-game.component.html',
  styleUrl: './match-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchWordsComponent { }
