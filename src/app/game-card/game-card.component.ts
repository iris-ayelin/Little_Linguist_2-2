import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameProfile } from '../../shared/model/games';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameCardComponent {
  openDialog(arg0: GameProfile) {
    throw new Error('Method not implemented.');
  }
  @Input() currentGame!: GameProfile;
}
