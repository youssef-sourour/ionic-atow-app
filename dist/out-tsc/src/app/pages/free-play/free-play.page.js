import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { ThemeService } from '../../services/theme.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { AdmobFreeService } from '../../services/admobfree.service';
var FreePlayPage = /** @class */ (function () {
    function FreePlayPage(admobFreeService, authService, navCtrl, storage, theme, platform, splashScreen, statusBar, alertService, router, alertCtrl) {
        this.admobFreeService = admobFreeService;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.theme = theme;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.alertService = alertService;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.iconSetting = 'md-settings';
        this.iconCoins = 'logo-usd';
        this.iconTwirlAndTip = 'md-disc';
        this.twirlAndTipValue = 0;
        this.off = false;
        this.dot = false;
        this.openMenu = false;
        this.initializeApp();
    }
    FreePlayPage.prototype.ionViewWillEnter = function () {
    };
    // continuous old game
    FreePlayPage.prototype.continuousOldGame = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Continuous Old Game',
                            message: 'You have saved game level ' + this.saveGameData.gameLevel + ' on ' + this.saveGameData.timeAt + '.Do you want to start a new puzzle or play where you left off?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.storage.remove('save_game').then(function () {
                                        });
                                    }
                                }, {
                                    text: 'Play',
                                    handler: function () {
                                        _this.playGame(_this.saveGameData.gameLevel, _this.saveGameData.gameType, true);
                                    }
                                }
                            ],
                            backdropDismiss: false
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FreePlayPage.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        }).catch(function () {
        });
    };
    FreePlayPage.prototype.ngOnInit = function () {
        this.admobFreeService.BannerAd();
    };
    FreePlayPage.prototype.showInterstitial = function () {
        this.admobFreeService.InterstitialAd();
    };
    FreePlayPage.prototype.showRewardVideo = function () {
        this.admobFreeService.RewardVideoAd();
    };
    FreePlayPage.prototype.settingsModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.navCtrl.navigateRoot('/settings');
                return [2 /*return*/];
            });
        });
    };
    FreePlayPage.prototype.playGame = function (gameLevel, gameType, continueGame) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dataSend, navigationExtras;
            return tslib_1.__generator(this, function (_a) {
                dataSend = {
                    gameLevel: gameLevel,
                    gameType: gameType,
                    continueGame: continueGame,
                };
                navigationExtras = {
                    queryParams: {
                        data: JSON.stringify(dataSend)
                    }
                };
                switch (gameType) {
                    case 'basic':
                        this.router.navigate(['/basic'], navigationExtras);
                        break;
                    case 'assorted':
                        this.router.navigate(['/assorted'], navigationExtras);
                        break;
                    case 'drop':
                        this.router.navigate(['/drop'], navigationExtras);
                        break;
                    case 'placement':
                        this.router.navigate(['/placement'], navigationExtras);
                        break;
                    case 'category':
                        this.router.navigate(['/category'], navigationExtras);
                        break;
                    case 'hint':
                        this.router.navigate(['/hint'], navigationExtras);
                        break;
                    case 'listed-letters':
                        this.router.navigate(['/listed-letters'], navigationExtras);
                        break;
                    case 'if-you-dare':
                        this.router.navigate(['/if-you-dare'], navigationExtras);
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    FreePlayPage.prototype.startGame = function (gameLevel, gameType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.storage.get('save_game').then(function (data) {
                    _this.saveGameData = data;
                }).then(function () {
                    // check if savedGame = true, display continous old game
                    if (_this.saveGameData) {
                        if (_this.saveGameData.savedGame === true) {
                            _this.continuousOldGame();
                        }
                    }
                    else {
                        _this.playGame(gameLevel, gameType, false);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    FreePlayPage = tslib_1.__decorate([
        Component({
            selector: 'app-free-play',
            templateUrl: './free-play.page.html',
            styleUrls: ['./free-play.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AdmobFreeService,
            AuthService,
            NavController,
            Storage,
            ThemeService,
            Platform,
            SplashScreen,
            StatusBar,
            AlertService,
            Router,
            AlertController])
    ], FreePlayPage);
    return FreePlayPage;
}());
export { FreePlayPage };
//# sourceMappingURL=free-play.page.js.map