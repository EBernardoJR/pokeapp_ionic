import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-saveds',
  templateUrl: './saveds.page.html',
  styleUrls: ['./saveds.page.scss'],
})
export class SavedsPage implements OnInit {
  pokemonsSaveds: any[] = [];
  name: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute, private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
    this.pokemonsSaveds = this.dataService.getData('pokemon');
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.name = params['name'];
      } else {
        this.navCtrl.navigateRoot('/login')
      }
    });
  }
  goBack() {
    this.navCtrl.back();
  }
  toDetails(pokemon: any, url: any){
    this.router.navigate(['/details'], { queryParams: { pokemon, url }})
  }
}
