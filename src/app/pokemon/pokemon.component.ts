import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/Pokemon";

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
    @Input() id: any = 0;
    pokemon: Pokemon = new Pokemon("unknown",0,0,"empty");
    hpColor: string = "bg-default";
    constructor(private pokemonService: PokemonService) {}

    ngOnInit(){
        let _pokemon = this.pokemonService.getPokemon(parseInt(this.id));
        _pokemon.subscribe( (res:any) => {
            console.log(res);
            if (res.name != undefined){
                this.pokemon = new Pokemon(
                    res.name,
                    res.stats[0].base_stat,
                    res.stats[0].base_stat,
                    res.sprites.front_default
                )
                this.checkHpColor();
            }
        });
    }

    checkHpColor(){
        let percentage = this.pokemon.currentHp * 100 / this.pokemon.maxHp;

        if (percentage > 80){
            this.hpColor = "bg-default";
        }else if(percentage > 20){
            this.hpColor = "bg-warning";
        }else{
            this.hpColor = "bg-danger";
        }
    }

    removeHp(){
        if(this.pokemon.currentHp - 5 < 0){
            this.pokemon.currentHp = 0;
        }else{
            this.pokemon.currentHp -= 5;
        }
        this.checkHpColor();
    }

    addHp(){
        if(this.pokemon.currentHp + 5 > this.pokemon.maxHp){
            this.pokemon.currentHp = this.pokemon.maxHp;
        }else{
            this.pokemon.currentHp += 5;
        }
        this.checkHpColor();
    }
}
