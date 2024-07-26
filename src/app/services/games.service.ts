import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/games';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private games: GameProfile[] = [
    new GameProfile(
      '1',
      'Mixed Letters',
      'reate a word from the preview mixed letters',
      '/first-game'
    ),
    new GameProfile(
      '2',
      'Match Words Game',
      'Compare and match between the preview words',
      '/second-game'
    ),
  ];

  constructor() {}

  public getGames(): GameProfile[] {
    return this.games;
  }
}
