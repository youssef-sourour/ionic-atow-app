import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ThemeService } from '../../../services/theme.service';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(modalController, authService, navCtrl, alertService, theme, databaseService, router) {
        this.modalController = modalController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.theme = theme;
        this.databaseService = databaseService;
        this.router = router;
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    // On Login button tap, dismiss Register modal and open login Modal
    RegisterPage.prototype.loginModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/login');
                this.router.navigate(["/login"]);
                return [2 /*return*/];
            });
        });
    };
    RegisterPage.prototype.register = function (form) {
        var _this = this;
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
        this.authService.register(form.value.first_name, form.value.last_name, form.value.user_name, form.value.email, form.value.password, form.value.password_confirmation).subscribe(function (data) {
            _this.authService.login(form.value.email, form.value.password).subscribe(function (data) {
                if (data['success'] == true) {
                    _this.alertService.presentToast('You\'ve successfully registered!');
                }
                else {
                    if (data['error']['email']) {
                        _this.alertService.presentToast(data['error']['email']);
                        return false;
                    }
                    if (data['error']['password']) {
                        _this.alertService.presentToast(data['error']['password']);
                        return false;
                    }
                }
                _this.authService.login(form.value.email, form.value.password).subscribe(function (data) {
                }, function (error) {
                    console.log(error);
                }, function () {
                    _this.databaseService.getGameMaps().subscribe(function (data) {
                    });
                    _this.databaseService.getLimitScores().subscribe(function (data) {
                    });
                    _this.authService.getUser().subscribe(function (data) {
                    }, function (error) { }, function () {
                        // this.navCtrl.navigateRoot('/dashboard');
                        _this.router.navigate(["/dashboard"]);
                    });
                });
            }, function (error) {
                console.log(error);
            }, function () {
            });
        }, function (error) {
            console.log(error);
        }, function () {
        });
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            AuthService,
            NavController,
            AlertService,
            ThemeService,
            DatabaseService,
            Router])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map