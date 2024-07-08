import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-first-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './first-game.component.html',
  styleUrl: './first-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstGameComponent { }
