export class Attack{
    name: string;
    type: string;
    damage: number;
  
    constructor(_name:string,_type: string,_damage: number) {
      this.name = _name;
      this.type = _type;
      this.damage = _damage;
    }
  }
  