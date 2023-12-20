import Card from "./card";
import { uid } from "uid";

class Player {
  id: string;
  playerName: string;
  playerCards: Card[];
  constructor(name: string) {
    this.id = uid(8);
    this.playerName = name;
    this.playerCards = [];
  }
  modifyPlayer(name: string) {
    this.playerName = name;
  }
  shuffleCards(): void {
    let location1: number, location2: number, tmp: Card;
    for (let i = 0; i < 1000; i++) {
      location1 = Math.floor(Math.random() * this.playerCards.length);
      location2 = Math.floor(Math.random() * this.playerCards.length);
      tmp = this.playerCards[location1];
      this.playerCards[location1] = this.playerCards[location2];
      this.playerCards[location2] = tmp;
    }
  }
}

export default Player;
