import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-second-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './second-game.component.html',
  styleUrl: './second-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondGameComponent { }
