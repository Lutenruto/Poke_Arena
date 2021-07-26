import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Pokemon} from "../models/Pokemon";
import { ActivatedRoute, Params } from '@angular/router';
import { Attack } from '../models/Attack';

@Component({
    selector: 'app-pokemon-fight',
    templateUrl: './pokemon-fight.component.html',
    styleUrls: ['./pokemon-fight.component.scss']
})
export class PokemonFightComponent implements OnInit {
    firstPokemon: Pokemon = new Pokemon("unknown",0,0,"empty","empty",0,0);
    secondPokemon: Pokemon = new Pokemon("unknown",0,0,"empty","empty",0,0);
    firstHpColor: string = "bg-default";
    secondHpColor: string = "bg-default";
    
    isLoaded: boolean = false;

    history: any[] = [];

    lastAttacker: number = 2;
    
    activeMove1:boolean = false;
    activeMove2:boolean = false;
    
    isFirstDead:boolean = false;
    isSecondDead:boolean = false;

    isFirstAttacked:boolean = false;
    isSecondAttacked:boolean = false;

    intervalFight:any = null;
    isPaused:boolean = true;
    
    dateStarted:Date|undefined = undefined;
    constructor(private pokemonService: PokemonService, private route: ActivatedRoute) {}

    ngOnInit(){
      this.route.params.subscribe((params: Params): void => {
          let _firstPokemon = this.pokemonService.getPokemon(Number(params.first));
          let _secondPokemon = this.pokemonService.getPokemon(Number(params.second));

          _firstPokemon.subscribe( (res:any) => {
            this.firstPokemon = new Pokemon(
              res.name,
              res.stats[0].base_stat,
              res.stats[0].base_stat,
              res.sprites.front_default,
              res.sprites.back_default,
              res.stats[1].base_stat,
              res.stats[2].base_stat,
              []
            )

            res.moves.forEach( async (moveObj:any) => {
                let moveId = moveObj.move.url.split('/')[6];
                await this.getMove(moveId,this.firstPokemon);
            })


            _secondPokemon.subscribe( (res:any) => {
                this.secondPokemon = new Pokemon(
                  res.name,
                  res.stats[0].base_stat,
                  res.stats[0].base_stat,
                  res.sprites.front_default,
                  res.sprites.back_default,
                  res.stats[1].base_stat,
                  res.stats[2].base_stat,
                  []
                )
                
                res.moves.forEach( async (moveObj:any) => {
                    let moveId = moveObj.move.url.split('/')[6];
                    await this.getMove(moveId,this.secondPokemon);
                })

                setTimeout(() => {
                    this.isLoaded = true;
                },1500);
                console.log(this.secondPokemon);
                
                this.intervalFight = setInterval(() => {
                    this.attack();
                },3000);
            });

          })
      });
    }

    async getMove(idMove: number,pokemon: Pokemon){
        this.pokemonService.getMove(idMove).subscribe( (moveRes:any) => {
            if(moveRes.power > 0){
                let move = new Attack(moveRes.names[3].name, moveRes.type.name, Number(moveRes.power));
                pokemon.moves?.push(move);
            }
        });
    }

    attack(){
        if(!this.isPaused){
            let attacker:Pokemon;
            let attacked:Pokemon;
            let isFirstAttacker:boolean;
            if(this.lastAttacker == 2){
                attacker = this.firstPokemon;
                attacked = this.secondPokemon;
                
                isFirstAttacker = true;
                this.lastAttacker = 1;

                this.activeMove1 = true;
                this.activeMove2 = false;
                
                this.isFirstAttacked = false;
                this.isSecondAttacked = true;
            }else{
                attacker = this.secondPokemon;
                attacked = this.firstPokemon;

                isFirstAttacker = false;
                this.lastAttacker = 2;

                this.activeMove1 = false;
                this.activeMove2 = true;
            
                this.isFirstAttacked = true;
                this.isSecondAttacked = false;
            }

            
            if (attacker !== undefined && attacked !== undefined && attacker.moves !== undefined){
                let randomNbr = Math.floor(Math.random() * (attacker.moves.length));
                let randomAttack = attacker.moves[randomNbr];

                let damages = Math.floor(( ((5 * 0.4 + 2) * attacker.attackStat * randomAttack.damage) / (attacked.defenseStat * 50) ) + 1);
                
                this.checkHpColor(attacked);
                this.history.unshift({
                    'attacker': attacker.name,
                    'attacked': attacked.name,
                    'attackName': randomAttack.name,
                    'damage': damages,
                    'isDead': false
                })
                if(attacked.currentHp - damages <= 0){
                    attacked.currentHp = 0;
                    clearInterval(this.intervalFight);
                    this.history.unshift({
                        'attacker': attacker.name,
                        'attacked': attacked.name,
                        'attackName': randomAttack.name,
                        'damage': damages,
                        'isDead': true
                    })

                    if(isFirstAttacker){
                        this.isSecondDead = true;
                    }else{
                        this.isFirstDead = true;
                    }

                    this.isFirstAttacked = false;
                    this.isSecondAttacked = false;
                }else{
                    attacked.currentHp = attacked.currentHp - damages;
                }
            }
        }
    }
    
    checkHpColor(pkmn: Pokemon){
        let percentage = pkmn.currentHp * 100 / pkmn.maxHp;

        if (percentage > 80){
            pkmn.hpColor = "bg-default";
        }else if(percentage > 50){
            pkmn.hpColor = "bg-warning";
        }else{
            pkmn.hpColor = "bg-danger";
        }
    }

    pauseFight(){
        if(this.dateStarted == undefined){
            this.dateStarted = new Date();
        }
        this.isPaused = this.isPaused ? false:true;
    }

    replayFight(){
        this.history = [];
        this.firstPokemon.currentHp = this.firstPokemon.maxHp;
        this.secondPokemon.currentHp = this.secondPokemon.maxHp;

        this.firstPokemon.hpColor = "bg-default";
        this.secondPokemon.hpColor = "bg-default";

        this.isFirstDead = false;
        this.isSecondDead = false;

        this.intervalFight = setInterval(() => {
            this.attack();
        },3000);

        this.dateStarted = new Date();
        
        this.lastAttacker = 2;
        this.isPaused = false;
    }
}
