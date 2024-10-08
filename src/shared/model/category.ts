import { Language } from './language';
import { TranslatedWord } from './translated-word';

export class Category {
  static lastModifiedDate() {
      throw new Error("Method not implemented.");
  }
  lastUpdateDate = new Date();
  words: TranslatedWord[] = [];

  constructor(
    public id: string,
    public name: string,
    public origin: Language,
    public target: Language
  ) {}
}

export { TranslatedWord };
