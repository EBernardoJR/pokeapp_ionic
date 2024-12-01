import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  name: string = '';

  constructor(private navCtrl: NavController) {}

  login() {
    if (this.email === '' || this.password === '' || this.name === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.navCtrl.navigateRoot('/home');
  }
}
