import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-game-dialog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './game-dialog.component.html',
  styleUrl: './game-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameDialogComponent { }
