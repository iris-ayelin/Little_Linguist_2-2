import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-letters-words-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mixed-letters-game.component.html',
  styleUrl: './mixed-letters-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedLettersComponent { }
