import { Injectable } from '@angular/core';
import { GameProfile } from '../../shared/model/games';
import { GameResultService } from './game-result.service';
import { Timestamp } from '@firebase/firestore';

interface WordResult {
  hebrewWord: string;
  guessedWord: string;
  isCorrect: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private gameResultService: GameResultService) {}

  private games: GameProfile[] = [
    new GameProfile(
      '1',
      'Mixed letters',
      'Create a word from the preview mixed letters',
      '/mixed-letters-game'
    ),
    new GameProfile(
      '2',
      'Match words',
      'Compare and match between the preview words',
      '/match-words-game'
    ),
    new GameProfile(
      '3',
      'Sorted words',
      'Arrange the jumbled words in the correct order to make',
      '/sorted-words-game'
    ),
  ];

  private results: WordResult[] = [];
  private correctAnswers: number = 0;
  private incorrectAnswers: number = 0;
  private coins: number = 0;

  public getGames(): GameProfile[] {
    return this.games;
  }

  public setResults(
    categoryId: string,
    results: WordResult[],
    correctAnswers: number,
    incorrectAnswers: number,
    coins: number
  ): void {
    this.results = results;
    this.correctAnswers = correctAnswers;
    this.incorrectAnswers = incorrectAnswers;
    this.coins = coins;
  }
  

  public getResults(): WordResult[] {
    return this.results;
  }

  public getCorrectAnswers(): number {
    return this.correctAnswers;
  }

  public getIncorrectAnswers(): number {
    return this.incorrectAnswers;
  }

  public getCoins(): number {
    return this.coins;
  }

  public async addGameResult(gameResult: {
    categoryId: string;
    gameId: string;
    date: Timestamp;
    points: number;
  }): Promise<void> {
    await this.gameResultService.addGameResult(gameResult)
  }
}
