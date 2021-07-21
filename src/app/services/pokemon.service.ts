import {Pokemon} from "../models/Pokemon";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class PokemonService{

  constructor(private http:HttpClient){}

  getPokemon(id:number): Observable<Pokemon>{
    return this.http.get<Pokemon>("https://pokeapi.co/api/v2/pokemon/" + id);
  }

  getAll(): Observable<Array<Pokemon>>{
      return this.http.get<Array<Pokemon>>("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20000");
  }
}
