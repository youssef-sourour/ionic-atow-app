import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { ThemeService } from '../../../services/theme.service';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    constructor(private modalController: ModalController,
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

    // On Login button tap, dismiss Register modal and open login Modal
    async loginModal() {
        // this.navCtrl.navigateRoot('/login');
        this.router.navigate(["/login"]);
    }

    register(form: NgForm) {
        if (form.value.first_name.trim() === '') {
            this.alertService.presentToast("Please enter your first name");
            return false;
        }
        if (form.value.last_name.trim() === '') {
            this.alertService.presentToast("Please enter your last name");
            return false;
        }
        if (form.value.user_name.trim() === '') {
            this.alertService.presentToast("Please enter your username");
            return false;
        }
        if (form.value.email.trim() === '') {
            this.alertService.presentToast("Please enter your email address");
            return false;
        }
        if (form.value.password.trim() === '') {
            this.alertService.presentToast("Please enter your password");
            return false;
        }
        if (form.value.password_confirmation.trim() === '') {
            this.alertService.presentToast("Please confirm your password");
            return false;
        }
        this.authService.register(form.value.first_name, form.value.last_name, form.value.user_name, form.value.email, form.value.password, form.value.password_confirmation).subscribe(
            data => {
                this.authService.login(form.value.email, form.value.password).subscribe(
                    data => {
                        if (data['success'] == true) {
                            this.alertService.presentToast('You\'ve successfully registered!');
                        }
                        else {
                            if (data['error']['email']) {
                                this.alertService.presentToast(data['error']['email']);
                                return false;
                            }
                            if (data['error']['password']) {
                                this.alertService.presentToast(data['error']['password']);
                                return false;
                            }
                        }
                        this.authService.login(form.value.email, form.value.password).subscribe(
                            data => {
                            },
                            error => {
                                console.log(error);
                            },
                            () => {
                                this.databaseService.getGameMaps().subscribe(
                                    data => {
                                    }
                                );
                                this.databaseService.getLimitScores().subscribe(
                                    data => {
                                    }
                                );
                                this.authService.getUser().subscribe(
                                    data => {
                                    },
                                    error => { },
                                    () => {
                                        // this.navCtrl.navigateRoot('/dashboard');
                                        this.router.navigate(["/dashboard"]);

                                    }
                                );
                            }
                        );
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                    }
                );
            },
            error => {
                console.log(error);
            },
            () => {

            }
        );
    }
}
