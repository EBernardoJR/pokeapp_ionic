import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  name: string = '';

  constructor(private router: Router, private dataService: DataService) {} 

  login() {
    if (this.email === '' || this.password === '' || this.name === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.dataService.setData('email', this.email);
    this.dataService.setData('name', this.name);

    this.router.navigate(['/home'], { });
  }
}
