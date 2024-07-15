export class GameProfile {
    gameId = '';
    gameName = '';
    gameDiscription = '';
    gameUrl = 'choose-game';
    /* . . . */
  }

export class GameProfile {
    lastUpdateDate = new Date();
    words : TranslatedWord[] = [];

    constructor(
        public gameId: string,
        public gameName : string,
        public gameDiscription : string,
        public gameUrl : string) {
    }
}