import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonFightComponent } from './pokemon-fight/pokemon-fight.component';

import { PokemonService } from "./services/pokemon.service";
import { HistoryLineComponent } from './history-line/history-line.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path : '', component: HomeComponent},
  { path : 'arena', component: PokemonListComponent },
  { path : 'arena/:first/:second', component: PokemonFightComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    TestComponent,
    PokemonFightComponent,
    HistoryLineComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
