import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import {ThemeService} from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  constructor(
      private modalController: ModalController,
      private authService: AuthService,
      private navCtrl: NavController,
      private theme: ThemeService,
      private router: Router
  ) {
  }
  ionViewWillEnter() {
    this.authService.getToken().then(() => {
      if(this.authService.isLoggedIn) {
        console.log('11')
        // this.navCtrl.navigateRoot('/dashboard');
        this.router.navigate[('/dashboard')];
      }
    });
  }

  ngOnInit() {

  }

  async register() {
      // this.navCtrl.navigateRoot('/register');
      this.router.navigate(['/register']);
      
  }

  async login() {
      // this.navCtrl.navigateRoot('/login');
      this.router.navigate(['/login']);
  }

  async freePlay() {
      // this.navCtrl.navigateRoot('/free-play');
      this.router.navigate(['/free-play']);
  }
}
