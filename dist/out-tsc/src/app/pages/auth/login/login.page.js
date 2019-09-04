import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { ThemeService } from '../../../services/theme.service';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';
var LoginPage = /** @class */ (function () {
    function LoginPage(modalController, authService, navCtrl, alertService, theme, databaseService, router) {
        this.modalController = modalController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.alertService = alertService;
        this.theme = theme;
        this.databaseService = databaseService;
        this.router = router;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    // On Register button tap, dismiss login modal and open register modal
    LoginPage.prototype.registerModal = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/register');
                this.router.navigate(["/register"]);
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.login = function (form) {
        var _this = this;
        if (form.value.email.trim() === '') {
            this.alertService.presentToast('Please enter an email address.');
            return false;
        }
        if (form.value.password.trim() === '') {
            this.alertService.presentToast('Please enter a password.');
            return false;
        }
        this.authService.login(form.value.email, form.value.password).subscribe(function (data) {
            if (data['success'] == true) {
                _this.alertService.presentToast('Logged In');
            }
            else {
                _this.alertService.presentToast('The email address and password you entered do not match. Please try again.');
            }
        }, function (error) {
            _this.alertService.presentToast('The email address and password you entered do not match. Please try again.');
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
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            AuthService,
            NavController,
            AlertService,
            ThemeService,
            DatabaseService,
            Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map