import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var ChoosePlayOptionPage = /** @class */ (function () {
    function ChoosePlayOptionPage(authService, alertService, navCtrl, storage) {
        this.authService = authService;
        this.alertService = alertService;
        this.navCtrl = navCtrl;
        this.storage = storage;
    }
    ChoosePlayOptionPage.prototype.ngOnInit = function () {
    };
    ChoosePlayOptionPage.prototype.regProgressivePlay = function () {
        var _this = this;
        this.authService.regPlayOption(1).subscribe(function (data) {
            if (data['success'] == true) {
                _this.alertService.presentToast('Success! Let\'s play!');
                _this.navCtrl.navigateRoot('/dashboard');
                _this.storage.set('user_info', data).then(function () {
                    console.log('User Info Updated');
                });
            }
            else {
                _this.alertService.presentToast('Register Play Option Error! Please try again');
                return false;
            }
        }, function (error) {
            console.log(error);
        }, function () {
        });
    };
    ChoosePlayOptionPage.prototype.regControlPlay = function () {
        var _this = this;
        this.authService.regPlayOption(2).subscribe(function (data) {
            if (data['success'] == true) {
                _this.alertService.presentToast('Success! Let\'s play!');
                _this.navCtrl.navigateRoot('/dashboard');
                _this.storage.set('user_info', data).then(function () {
                    console.log('User Info Updated');
                });
            }
            else {
                _this.alertService.presentToast('Register Play Option Error! Please try again');
                return false;
            }
        }, function (error) {
            console.log(error);
        }, function () {
        });
    };
    ChoosePlayOptionPage = tslib_1.__decorate([
        Component({
            selector: 'app-choose-play-option',
            templateUrl: './choose-play-option.page.html',
            styleUrls: ['./choose-play-option.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            AlertService,
            NavController,
            Storage])
    ], ChoosePlayOptionPage);
    return ChoosePlayOptionPage;
}());
export { ChoosePlayOptionPage };
//# sourceMappingURL=choose-play-option.page.js.map