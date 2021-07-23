import { Attack } from "./Attack";

export class Pokemon{
  name: string;
  currentHp: number;
  maxHp: number;
  imgLink: string;
  backImgLink: string;
  moves?: Attack[];

  constructor(_name:string,_currentHp: number,_maxHp: number, _imgLink: string,_backImgLink:string, _moves?: Attack[]) {
    this.name = _name;
    this.currentHp = _currentHp;
    this.maxHp = _maxHp;
    this.imgLink = _imgLink;
    this.backImgLink = _backImgLink;
    this.moves = _moves;
  }
}
