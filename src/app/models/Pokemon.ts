export class Pokemon{
  name: string;
  currentHp: number;
  maxHp: number;
  imgLink: string;

  constructor(_name:string,_currentHp: number,_maxHp: number, _imgLink: string) {
    this.name = _name;
    this.currentHp = _currentHp;
    this.maxHp = _maxHp;
    this.imgLink = _imgLink;
  }
}
