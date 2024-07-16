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

export class ChooseGameComponent {
  
  //  ## Work in Progress

  // constructor() {}

  // getGames(){
  //   this.GamesService.getGames();
  //   console.log(this)
  // }

  //  ## Work in Progress
 }

