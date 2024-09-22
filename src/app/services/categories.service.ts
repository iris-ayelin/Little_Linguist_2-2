import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  Firestore,
  getDocs,
  QuerySnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { categoryConverter } from './converter/category-converter';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  async list(): Promise<Category[]> {
    const categoryCollection = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);

    const querySnapshot: QuerySnapshot<Category> = await getDocs(
      categoryCollection
    );

    const result: Category[] = [];

    querySnapshot.docs.forEach((docSnap: DocumentSnapshot<Category>) => {
      const data = docSnap.data();
      if (data) {
        result.push(data);
      }
    });
    return result;
  }

  get(id: string): Category | undefined {
    return undefined;
  }

  async add(newCategoryData: Category) {
    const categoriesRef = collection(
      this.firestore,
      'categories'
    ).withConverter(categoryConverter);

    const querySnapshot = await getDocs(categoriesRef);
    let maxId = 0;

    querySnapshot.forEach((doc) => {
      const docId = parseInt(doc.id, 10);
      if (docId > maxId) {
        maxId = docId;
      }
    });
    const newId = (maxId + 1).toString();
    await setDoc(doc(categoriesRef, newId), newCategoryData);
  }

  update(existingCategory: Category): void {}

  delete(existingCategoryId: string): void {}
}
