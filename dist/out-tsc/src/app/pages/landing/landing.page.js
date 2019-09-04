import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
var LandingPage = /** @class */ (function () {
    function LandingPage(modalController, authService, navCtrl, theme, router) {
        this.modalController = modalController;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.theme = theme;
        this.router = router;
    }
    LandingPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.authService.getToken().then(function () {
            if (_this.authService.isLoggedIn) {
                console.log('11');
                // this.navCtrl.navigateRoot('/dashboard');
                _this.router.navigate[('/dashboard')];
            }
        });
    };
    LandingPage.prototype.ngOnInit = function () {
    };
    LandingPage.prototype.register = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/register');
                this.router.navigate(['/register']);
                return [2 /*return*/];
            });
        });
    };
    LandingPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/login');
                this.router.navigate(['/login']);
                return [2 /*return*/];
            });
        });
    };
    LandingPage.prototype.freePlay = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/free-play');
                this.router.navigate(['/free-play']);
                return [2 /*return*/];
            });
        });
    };
    LandingPage = tslib_1.__decorate([
        Component({
            selector: 'app-landing',
            templateUrl: './landing.page.html',
            styleUrls: ['./landing.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            AuthService,
            NavController,
            ThemeService,
            Router])
    ], LandingPage);
    return LandingPage;
}());
export { LandingPage };
//# sourceMappingURL=landing.page.js.map