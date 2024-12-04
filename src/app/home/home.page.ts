import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PokemonService } from '../services/pokeapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pokemonList: any[] = [];
  pokemonsSaveds: any[] = []; // Lista de Pokémon
  isLoading = true; // Indicador de carregamento
  filter: string = '';
  name: string = 'Usuário';
  filteredPokemonList: any[] = []; // Lista filtrada

  constructor(private pokemonService: PokemonService,
    private navCtrl: NavController, private route: ActivatedRoute,
    private dataService: DataService, private router: Router
  ) {}

  ngOnInit() {
    this.fetchPokemonList();
    this.pokemonsSaveds = this.dataService.getData('pokemon')
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.name = params['name'];
      } else {
        this.navCtrl.navigateRoot('/login')
      }
    });
  }

  fetchPokemonList() {
    this.pokemonService.getPokemonList(20, 0).subscribe({
      next: (response) => {
        console.log('Pokémon:', response);
        const list = response.results?.map((poke: any) => {
          const id = poke.url.split('/').slice(-2, -1)[0];
          return {
            ...poke,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }
        })
        console.log(list)
        this.pokemonList = list;
        this.filteredPokemonList = list;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar Pokémon:', error);
        this.isLoading = false;
      }
    });
  }
  filterPokemon() {
    const searchTermLower = this.filter.toLowerCase(); // Converter termo para minúsculas
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTermLower) // Nome do Pokémon
    );
  }

  save(pokemon: any) {
    this.dataService.setData('pokemon', pokemon);
    this.pokemonsSaveds = this.dataService.getData('pokemon')
    console.log(this.pokemonsSaveds)
  }
  toSaveds() {
    this.router.navigate(['/saveds'], { queryParams: { name: this.name }})
  }
}
