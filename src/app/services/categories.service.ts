import { Injectable } from '@angular/core';
import { Category } from '../../shared/model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: Category[] = [];

  getAllCategories(): Category[] {
    return this.categories;
  }
  
  getRandomCategory(): Category {
    const categories = this.list();

    if (categories.length === 0) {
      throw new Error('No categories available');
    }

    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  getAll(): Category[] {
    throw new Error('Method not implemented.');
  }
  private readonly CATEGORIES_KEY = 'categories';
  private readonly NEXT_ID_KEY = 'nextId';

  private getCategories(): Map<number, Category> {
    const categoriesString = localStorage.getItem(this.CATEGORIES_KEY);
    return categoriesString
      ? new Map<number, Category>(JSON.parse(categoriesString))
      : new Map<number, Category>();
  }

  private getNextId(): number {
    const nextIdString = localStorage.getItem(this.NEXT_ID_KEY);
    return nextIdString ? parseInt(nextIdString, 10) : 0;
  }

  private setCategories(list: Map<number, Category>): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(Array.from(list)));
  }

  private setNextId(id: number): void {
    localStorage.setItem(this.NEXT_ID_KEY, id.toString());
  }

  list(): Category[] {
    return Array.from(this.getCategories().values());
  }

  get(id: number): Category | undefined {
    return this.getCategories().get(id);
  }

  delete(id: number): void {
    const categoriesMap = this.getCategories();
    categoriesMap.delete(id);
    this.setCategories(categoriesMap);
  }

  update(category: Category): void {
    const categoriesMap = this.getCategories();
    category.lastUpdateDate = new Date();
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
  }

  add(category: Category): void {
    category.id = this.getNextId();
    category.lastUpdateDate = new Date();
    const categoriesMap = this.getCategories();
    categoriesMap.set(category.id, category);
    this.setCategories(categoriesMap);
    this.setNextId(category.id + 1);
  }

  getRandomWordsFromCategory(
    categoryId: number,
    count: number
  ): { origin: string; target: string }[] {
    const category = this.get(categoryId);
    if (!category || category.words.length === 0) {
      return [];
    }

    const shuffledWords = category.words.sort(() => 0.5 - Math.random());
    return shuffledWords.slice(0, count);
  }
}
