import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mixed-words-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mixed-words-game.component.html',
  styleUrl: './mixed-words-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent { }
