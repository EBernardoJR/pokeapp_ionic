import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
 // Dados do Pokémon
  pokemon = {
    name: 'charmander',
    weight: 85,
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
    },
    moves: ['mega-punch', 'fire-punch', 'scratch'],
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  };
  constructor() { }

  ngOnInit() {
  }

}

