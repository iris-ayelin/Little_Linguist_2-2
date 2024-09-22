import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';

export interface GameResult {
  categoryId: string;
  gameId: string;
  date: Timestamp;
  points: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameResultService {
  private gameResultsCollection = 'gameResults';

  constructor(private firestore: Firestore) {}

  async addGameResult(gameResult: GameResult): Promise<void> {
    const gameResultRef = await addDoc(
      collection(this.firestore, this.gameResultsCollection),
      {
        categoryId: gameResult.categoryId,
        gameId: gameResult.gameId,
        date: gameResult.date,
        points: gameResult.points,
      }
    );
  }

  async list(playerId: string): Promise<GameResult[]> {
    const result: GameResult[] = [];

    {
      const gameResultsRef = collection(
        this.firestore,
        this.gameResultsCollection
      );
      const newQueary = query(gameResultsRef, where('playerId', '==', playerId));

      const querySnapshot = await getDocs(newQueary);
      querySnapshot.forEach((doc) => {
        const data = doc.data() as GameResult;
        result.push(data);
      });
    }

    return result;
  }
}
