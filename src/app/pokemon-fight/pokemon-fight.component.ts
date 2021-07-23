import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/Pokemon";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-pokemon-fight',
    templateUrl: './pokemon-fight.component.html',
    styleUrls: ['./pokemon-fight.component.scss']
})
export class PokemonFightComponent implements OnInit {
    pokemon: Pokemon = new Pokemon("unknown",0,0,"empty","empty");
    
    firstPokemon: Pokemon = new Pokemon("unknown",0,0,"empty","empty");
    secondPokemon: Pokemon = new Pokemon("unknown",0,0,"empty","empty");
    firstHpColor: string = "bg-default";
    secondHpColor: string = "bg-default";
    
    isLoaded: boolean = false;

    history: string[] = [];

    constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {}

    ngOnInit(){
        // setInterval(() => {
        //     this.history.unshift("Metapod a attaqué Dracaufeu avec telle vive-attaque et a infligé 10 de dégats");
        // },2000)
      this.route.params.subscribe((params: Params): void => {
          let _firstPokemon = this.pokemonService.getPokemon(Number(params.first));
          let _secondPokemon = this.pokemonService.getPokemon(Number(params.second));

          _firstPokemon.subscribe( (res:any) => {
            this.firstPokemon = new Pokemon(
              res.name,
              res.stats[0].base_stat,
              res.stats[0].base_stat,
              res.sprites.front_default,
              res.sprites.back_default
            )
            
            for(let i = 0; i < res.moves.length; i++){
                
            }

            _secondPokemon.subscribe( (res:any) => {
                this.secondPokemon = new Pokemon(
                  res.name,
                  res.stats[0].base_stat,
                  res.stats[0].base_stat,
                  res.sprites.front_default,
                  res.sprites.back_default
                )

                setTimeout(() => {
                    this.isLoaded = true;
                },2000);
            })

          })
      });
    }

    checkHpColor(){
        let percentage = this.pokemon.currentHp * 100 / this.pokemon.maxHp;

        if (percentage > 80){
            this.firstHpColor = "bg-default";
        }else if(percentage > 20){
            this.firstHpColor = "bg-warning";
        }else{
            this.firstHpColor = "bg-danger";
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
