import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
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

  async getCategories(): Promise<Map<number, Category>> {
    const categoriesMap = new Map<number, Category>();

    const querySnapshot = await getDocs(
      collection(this.firestore, 'categories')
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const categoryId = Number(doc.id);
      const categoryData: Category = data as Category;

      categoriesMap.set(categoryId, categoryData);
    });

    return categoriesMap;
  }

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

  async get(id: string): Promise<Category | undefined> {
    const docRef = doc(this.firestore, 'categories', id.toString());
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as Category) : undefined;
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

  async update(existingCategory: Category): Promise<void> {
    if (!existingCategory.id) {
      return;
    }

    const categoryRef = doc(
      this.firestore,
      'categories',
      existingCategory.id
    ).withConverter(categoryConverter);

    setDoc(categoryRef, existingCategory);
  }

  async delete(existingCategoryId: string): Promise<void> {
    const categoryRef = doc(this.firestore, 'categories', existingCategoryId);
    deleteDoc(categoryRef);
  }
}
