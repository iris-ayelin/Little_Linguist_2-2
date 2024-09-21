import { Timestamp } from '@angular/fire/firestore';
import { addDoc, collection, Firestore } from 'firebase/firestore';

export class GameResult {
  constructor(public firestore: Firestore) {}

  async createResult(
    categoryId: string,
    gameId: string,
    date: Timestamp,
    points: number
  ) {
    const gameResultRef = await addDoc(
      collection(this.firestore, 'gameResults'),
      {
        categoryId: categoryId,
        gameId: gameId,
        date: date,
        points: points,
      }
    );
    console.log('Document written with ID: ', gameResultRef.id);
  }
}
