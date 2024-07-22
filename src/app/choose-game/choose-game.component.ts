import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-choose-game',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './choose-game.component.html',
  styleUrl: './choose-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ChooseGameComponent implements OnInit {
  
  allGames : GameProfile[] = []

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void{
    this.allGames = this.gamesService.getGames();
  }
}

