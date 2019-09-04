import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-choose-play-option',
    templateUrl: './choose-play-option.page.html',
    styleUrls: ['./choose-play-option.page.scss'],
})
export class ChoosePlayOptionPage implements OnInit {

    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private navCtrl: NavController,
        private storage: Storage,
    ) { }

    ngOnInit() {
    }

    regProgressivePlay() {
        this.authService.regPlayOption(1).subscribe(
            data => {
                if (data['success'] == true) {
                    this.alertService.presentToast('Success! Let\'s play!');
                    this.navCtrl.navigateRoot('/dashboard');
                    this.storage.set('user_info', data).then(
                        () => {
                            console.log('User Info Updated');
                        }
                    );
                }
                else {
                    this.alertService.presentToast('Register Play Option Error! Please try again');
                    return false;
                }
            },
            error => {
                console.log(error);
            },
            () => {

            }
        );
    }

    regControlPlay() {
        this.authService.regPlayOption(2).subscribe(
            data => {
                if (data['success'] == true) {
                    this.alertService.presentToast('Success! Let\'s play!');
                    this.navCtrl.navigateRoot('/dashboard');
                    this.storage.set('user_info', data).then(
                        () => {
                            console.log('User Info Updated');
                        }
                    );
                }
                else {
                    this.alertService.presentToast('Register Play Option Error! Please try again');
                    return false;
                }
            },
            error => {
                console.log(error);
            },
            () => {

            }
        );
    }
}
