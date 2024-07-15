import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  private games : GameProfile[] = [new GameProfile(), new GameProfile()]

  public get() : GameProfile[] {
    return this.games;
  }
}
