import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/games';

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  
  private games : GameProfile[] = [new GameProfile()]

  constructor() {}

  public getGames() : GameProfile[] {
    return this.games;
  }
}
