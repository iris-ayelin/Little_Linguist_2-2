import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';
import { GameProfile } from '../../shared/model/games';

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

