import * as tslib_1 from "tslib";
import { Component, ElementRef } from '@angular/core';
import { TwirlAndTipService } from '../../services/twirl-and-tip.service';
import { AlertService } from '../../services/alert.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
var TwirlAndTipPage = /** @class */ (function () {
    function TwirlAndTipPage(twirlAndTipService, alertService, navCtrl, storage, element, authService, alertCtrl, router) {
        this.twirlAndTipService = twirlAndTipService;
        this.alertService = alertService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.element = element;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.router = router;
        this.disableBtn = 0;
        this.bonusCoinsPoint = 0;
    }
    TwirlAndTipPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('user_info').then(function (data) {
            _this.user = data;
            var toDate = new Date().toJSON().slice(0, 10);
            if (_this.user.date_free_spin > toDate) {
                _this.alertService.presentToast('Please come back tomorrow!');
                _this.disableBtn = 1;
            }
            else {
                _this.disableBtn = 0;
            }
        });
    };
    TwirlAndTipPage.prototype.ngOnInit = function () {
    };
    TwirlAndTipPage.prototype.ngAfterViewInit = function () {
        if (!$("#myModalTwirl").length) {
            var modalContent = "<div id=\"myModalTwirl\" class=\"at-modal\">\n                <!-- Modal content -->\n                <div class=\"at-modal-content twirl\">\n                \n                <h1 style=\"margin-top: 40px;\">Daily Reward</h1>\n                <h1>Congratulations</h1>\n                <p class=\"your-coin\"></p>\n                <ion-img class=\"p-coin\" src=\"../../../assets/imgs/pop-up/p-coin.png\" ></ion-img>\n                <br/>\n                <br/><br/>\n                <div>\n                \n                    <button id=\"goToDashboard\" class=\"bt-buy\">COLLECT</button>\n                </div>\n            \n                </div>\n            </div>";
            $('body').after(modalContent);
        }
    };
    TwirlAndTipPage.prototype.updateScore = function (spin_result) {
        var _this = this;
        this.twirlAndTipService.updateTAT(spin_result).subscribe(function (data) {
            _this.user.twirl_tip += data['bonusTATPoint'];
            var tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toJSON().slice(0, 10);
            _this.bonusCoinsPoint = data['bonusTATPoint'];
            $('.your-coin').text(_this.bonusCoinsPoint);
            _this.authService.getUser().subscribe(function (data) {
            }, function (error) { }, function () {
            });
        }, function (error) {
            console.log(error);
        }, function () {
            // this.alertGetCoins(this.bonusCoinsPoint);
            var modal = $("#myModalTwirl");
            modal.show();
            $("#blur").addClass("blur-bg");
            $(window).click(function (e) {
                // if (e.target.id === "myModalTwirl") {
                //     modal.hide();
                //     $("#blur").removeClass("blur-bg");
                // }
                if (e.target.id === "goToDashboard") {
                    // this.navCtrl.navigateRoot("/dashboard");
                    _this.router.navigate[('/dashboard')];
                    modal.hide();
                    $("#blur").removeClass("blur-bg");
                }
            });
        });
    };
    // alert if no word with first and last letter
    TwirlAndTipPage.prototype.alertGetCoins = function (coins) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertGetCoins;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Congratulations!',
                            message: 'You get ' + coins + ' coins',
                            buttons: [{
                                    text: 'Back To Level Map',
                                    handler: function () {
                                        // this.navCtrl.navigateRoot('/dashboard');
                                        _this.router.navigate[('/dashboard')];
                                    }
                                }],
                            backdropDismiss: false
                        })];
                    case 1:
                        alertGetCoins = _a.sent();
                        alertGetCoins.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    TwirlAndTipPage.prototype.delay = function (ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    };
    TwirlAndTipPage.prototype.onStartClick = function () {
        var _this = this;
        this.disableBtn = 1;
        var randomInt = (Math.round(Math.random() * 9)) + 1;
        var deg = 675 + randomInt * 90;
        var spin_result = '';
        switch (randomInt) {
            case 1:
                spin_result = 'summer';
                break;
            case 2:
                spin_result = 'winter';
                break;
            case 3:
                spin_result = 'autumn';
                break;
            case 4:
                spin_result = 'spring';
                break;
            case 5:
                spin_result = 'summer';
                break;
            case 6:
                spin_result = 'winter';
                break;
            case 7:
                spin_result = 'autumn';
                break;
            case 8:
                spin_result = 'spring';
                break;
            case 9:
                spin_result = 'summer';
                break;
        }
        this.element.nativeElement.querySelector('[id="wheel"]').style.webkitTransform = "rotate(" + deg + "deg)";
        this.delay(4000).then(function () {
            _this.updateScore(spin_result);
        });
    };
    TwirlAndTipPage.prototype.goBack = function () {
        this.router.navigate(['/dashboard']);
    };
    TwirlAndTipPage = tslib_1.__decorate([
        Component({
            selector: 'app-twirl-and-tip',
            templateUrl: './twirl-and-tip.page.html',
            styleUrls: ['./twirl-and-tip.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TwirlAndTipService,
            AlertService,
            NavController,
            Storage,
            ElementRef,
            AuthService,
            AlertController,
            Router])
    ], TwirlAndTipPage);
    return TwirlAndTipPage;
}());
export { TwirlAndTipPage };
//# sourceMappingURL=twirl-and-tip.page.js.map