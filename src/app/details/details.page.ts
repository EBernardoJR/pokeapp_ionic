import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokeapi.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  // Dados do Pokémon
  pokemon: any = {
    name: 'charmander',
    weight: 0,
    stats: [],
    moves: [],
    image: '',
  };

  pokemonName: string = '';

  isSaved: boolean = false;

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['pokemon']) {
        this.pokemonName = params['pokemon'];
        this.pokemon.name = this.pokemonName;
        this.pokemon.image = params['url'];
        this.fetchPokemonList(params['pokemon'])
      }
    });
  }


  fetchPokemonList(name: string) {
    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (response) => {
        console.log('Pokémon:', response);
        this.pokemon.weight = response.weight;
        response.stats.map((stat: any) => {
          const acc = {
            name: stat.stat.name,
            value: stat.base_stat,
          };
          if (this.pokemon.stats.length < 4) {
            this.pokemon.stats.push(acc)
          }
        }, {});

        response.moves.map((move: any) =>{
           if (this.pokemon.moves.length < 15) {
            this.pokemon.moves.push(move.move.name)
           }
          });
        if (response.moves.length > 15) {
            this.pokemon.moves.push('...')
           }
      },
      error: (error) => {
        console.error('Erro ao buscar Pokémon:', error);
      }
    });
  }

  // Alterna o estado de "Salvar"
  toggleSave() {
    this.isSaved = !this.isSaved; // Altera entre salvo e não salvo
    this.save(this.pokemon)
  }

  save(pokemon: any) {
    this.dataService.setData('pokemon', pokemon);
  }
}
