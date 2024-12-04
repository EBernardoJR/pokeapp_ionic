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
  pokemonsSaveds: any[] = [];  
  isLoading = true;  
  filter: string = '';
  name: string = '';  
  email: string = '';  
  filteredPokemonList: any[] = [];  

  constructor(private pokemonService: PokemonService,
    private navCtrl: NavController, private route: ActivatedRoute,
    private dataService: DataService, private router: Router
  ) {}

  ngOnInit() {
    this.fetchPokemonList();

    
    this.name = this.dataService.getData('name');  
    this.email = this.dataService.getData('email');  

    
    if (!this.name || !this.email) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  fetchPokemonList() {
    this.pokemonService.getPokemonList(20, 0).subscribe({
      next: (response) => {
        const list = response.results?.map((poke: any) => {
          const id = poke.url.split('/').slice(-2, -1)[0];
          return {
            ...poke,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          }
        });
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
    const searchTermLower = this.filter.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTermLower)
    );
  }

  save(pokemon: any) {
    this.dataService.setData('pokemon', pokemon);
    this.pokemonsSaveds = this.dataService.getData('pokemon');
  }

  toSaveds() {
    this.router.navigate(['/saveds'], { queryParams: { name: this.name } });
  }
}
