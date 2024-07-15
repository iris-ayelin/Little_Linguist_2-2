import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  games : games[] = ['Match Words', 'Mixed Words']

}
