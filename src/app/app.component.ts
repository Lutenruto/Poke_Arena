import { Component } from '@angular/core';
import {PokemonService} from "./services/pokemon.service";
import {Pokemon} from "./models/Pokemon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "Poke Arena"
    pokemons: Array<any> = [];

    constructor(private pokemonService: PokemonService){}

    ngOnInit(){
        this.pokemonService.getAll().subscribe( (res:any) => {
            for(let i = 0; i < res.results.length; i++){
                let urlSplit = res.results[i].url.trim().split("/");
                res.results[i].id = urlSplit[6];
            }
            this.pokemons = res.results;
        })
    }
}
