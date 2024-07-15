import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  private games : games[] = ['Match Words', 'Mixed Words']

}
