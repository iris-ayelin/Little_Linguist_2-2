export class GameProfile {
    gameId = '';
    gameName = '';
    gameDiscription = '';
    gameUrl = 'choose-game';
    /* . . . */
  }

export class GameProfile {

    constructor(
        public gameId: string,
        public gameName : string,
        public gameDiscription : string,
        public gameUrl : string) {
    }
}