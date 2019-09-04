import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {AlertService} from 'src/app/services/alert.service';
import {ThemeService} from '../../../services/theme.service';
import {DatabaseService} from '../../../services/database.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(
        private modalController: ModalController,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private theme: ThemeService,
        private databaseService: DatabaseService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    // On Register button tap, dismiss login modal and open register modal
    async registerModal() {
        // this.navCtrl.navigateRoot('/register');
        this.router.navigate(["/register"]);

    }

    login(form: NgForm) {
        if (form.value.email.trim() === '') {
            this.alertService.presentToast('Please enter an email address.');
            return false;
        }
        if (form.value.password.trim() === '') {
            this.alertService.presentToast('Please enter a password.');
            return false;
        }

        this.authService.login(form.value.email, form.value.password).subscribe(
            data => {
                if (data['success'] == true) {
                    this.alertService.presentToast('Logged In');
                }
                else {
                    this.alertService.presentToast('The email address and password you entered do not match. Please try again.');
                }
            },
            error => {
                this.alertService.presentToast('The email address and password you entered do not match. Please try again.');
                console.log(error);
            },
            () => {
                this.databaseService.getGameMaps().subscribe(
                    data=>{
                    }
                );
                this.databaseService.getLimitScores().subscribe(
                    data=>{
                    }
                );
                this.authService.getUser().subscribe(
                    data => {
                    },
                    error=>{},
                    ()=>{
                        // this.navCtrl.navigateRoot('/dashboard');
                        this.router.navigate(["/dashboard"]);
                    }
                );
            }
        );
    }
}
