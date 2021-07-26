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


  //fonction prise pour exemple depuis un doc qui trainais
  // public attack(adversary: Pokemon): number {
  //   let damage = Math.floor(Math.floor(Math.floor(2 * this.level / 5 + 2) * this.offensive_stat * this.base_power / this.defensive_stat) / 50) + 2;
  //   return adversary.currentHp -= damage;
  // }

  // public fight(adversary: Pokemon): Promise<Pokemon> {
  //   return new Promise<Pokemon>(async (resolve, reject) => {
  //     let i = 0;
  //     while (this.currentHp > 0 && adversary.currentHp > 0) {
  //       if (i % 2 == 0) {
  //         await setTimeout(() => adversary.currentHp = this.attack(adversary), 1000);
  //         console.log(chalk.red(this.name + " attack " + adversary.name));
  //       } else {
  //         await setTimeout(() => this.currentHp = adversary.attack(this), 1000);
  //         console.log(chalk.blue(adversary.name + " attack " + this.name));
  //       }
  //     }
  //     if(this.currentHp <= 0)
  //       resolve(adversary);
  //     else
  //       resolve(this);
  //   })
  // }

}
