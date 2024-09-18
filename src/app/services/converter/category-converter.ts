import {
  QueryDocumentSnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';
import { Category, TranslatedWord } from '../../../shared/model/category';
import { Language } from '../../../shared/model/language';

export const categoryConverter = {
  toFirestore: (categoryToSave: Category) => {
    const wordsArr = [];

    for (let i = 0; i < categoryToSave.words.length; ++i) {
      wordsArr.push({
        origin: categoryToSave.words[i].origin,
        target: categoryToSave.words[i].target,
      });
    }

    return {
      name: categoryToSave.name,
      origin: categoryToSave.origin,
      target: categoryToSave.target,
      lastUpdateDate: categoryToSave.lastUpdateDate,
      words: wordsArr,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    console.log('Firestore Document Data:', data)
  

    const lastUpdateDate = data['lastUpdateDate'] ? data['lastUpdateDate'].toDate() : null;
  
    const words = data['words'];
    const category = new Category(
      snapshot.id,
      lastUpdateDate, 
      data['name'],
      words || []    
    );
  
    if (words) {
      for (let i = 0; i < words.length; ++i) {
        category.words.push(
          new TranslatedWord(words[i].origin, words[i].target)
        );
      }
    }
  
    return category;
  },
  
};
