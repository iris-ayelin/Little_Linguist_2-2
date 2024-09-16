import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import { addDoc, collection, DocumentSnapshot, Firestore, getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { categoryConverter } from './converter/category-converter'; 

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {}

  async list(): Promise<Category[]> {
    const categoryCollection = collection(this.firestore, 'categories').withConverter(
      categoryConverter
    );

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

  async add(newPersonData: Category) {
    const categoryCollection = collection(this.firestore, 'categories').withConverter(
      categoryConverter
    );
    await addDoc(categoryCollection, newPersonData);
  }

  update(existingPerson: Category): void {}

  delete(existingPersonId: string): void {}
}