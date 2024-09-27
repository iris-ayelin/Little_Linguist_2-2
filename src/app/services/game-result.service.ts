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
    await addDoc(collection(this.firestore, this.gameResultsCollection), {
      categoryId: gameResult.categoryId,
      gameId: gameResult.gameId,
      date: gameResult.date,
      points: gameResult.points,
    });
  }

  async list(): Promise<GameResult[]> {
    const result: GameResult[] = [];

    {
      const gameResultsRef = collection(
        this.firestore,
        this.gameResultsCollection
      );
      const newQueary = query(gameResultsRef);

      const querySnapshot = await getDocs(newQueary);
      querySnapshot.forEach((doc) => {
        const data = doc.data() as GameResult;
        result.push(data);
      });
    }

    return result;
  }

  async getGamesThisMonth(): Promise<GameResult[]> {
    const result: GameResult[] = [];

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const firstDayTimestamp = Timestamp.fromDate(firstDayOfMonth);
    const nowTimestamp = Timestamp.fromDate(now);

    const gameResultsRef = collection(
      this.firestore,
      this.gameResultsCollection
    );

    const dateQuery = query(
      gameResultsRef,
      where('date', '>=', firstDayTimestamp),
      where('date', '<=', nowTimestamp)
    );

    const querySnapshot = await getDocs(dateQuery);

    querySnapshot.forEach((doc) => {
      const data = doc.data() as GameResult;
      result.push(data);
    });

    return result;
  }
}
