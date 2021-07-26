import { Attack } from "./Attack";

export class Pokemon{
  name: string;
  currentHp: number;
  maxHp: number;
  imgLink: string;
  backImgLink: string;
  attackStat:number;
  defenseStat:number;
  moves?: Attack[];
  hpColor:string;

  constructor(
    _name:string,
    _currentHp: number,
    _maxHp: number,
    _imgLink: string,
    _backImgLink:string,
    _attackStat:number, 
    _defenseStat: number, 
    _moves?: Attack[]
  ){
    this.name = _name;
    this.currentHp = _currentHp;
    this.maxHp = _maxHp;
    this.imgLink = _imgLink;
    this.backImgLink = _backImgLink;
    this.attackStat = _attackStat;
    this.defenseStat = _defenseStat;
    this.moves = _moves;
    this.hpColor = "bg-default";
  }

}
