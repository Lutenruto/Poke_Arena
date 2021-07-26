import { Component, OnInit } from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  title = "Poke Arena"
  pokemons: Array<any> = [];
  firstSelected: number = 0;
  secondSelected: number = 0;
  showFightButton: boolean = false;

  isLoaded: boolean = false;

  constructor(private pokemonService: PokemonService, private router: Router){}

  ngOnInit(){
      this.pokemonService.getAll().subscribe( (res:any) => {
          for(let i = 0; i < res.results.length; i++){
              let urlSplit = res.results[i].url.trim().split("/");
              res.results[i].id = urlSplit[6];
              setTimeout(() => {
                this.isLoaded = true;
              },2000); 
          }
          this.pokemons = res.results;
      })
  }

  startFight(){
    if(this.firstSelected != 0 && this.secondSelected != 0){
      this.router.navigate(['arena/', this.firstSelected, this.secondSelected]);
    }
  }

  selectPokemon1(idPkmn:number){
      this.firstSelected = idPkmn;
      this.checkBoth();
  }

  selectPokemon2(idPkmn:number){
      this.secondSelected = idPkmn;
      this.checkBoth();
  }

  checkBoth(){
      if(this.secondSelected != 0 && this.firstSelected != 0){
          this.showFightButton = true;
      }else{
          this.showFightButton = false;
      }
  }
}
