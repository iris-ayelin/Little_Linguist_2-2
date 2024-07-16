import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  private games : GameProfile[] = [new GameProfile()]

 
  public get() : GameProfile[] {
    return this.games;
  }
  
}
