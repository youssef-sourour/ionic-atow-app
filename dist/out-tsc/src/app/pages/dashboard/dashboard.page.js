import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { ThemeService } from "../../services/theme.service";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { AdmobFreeService } from '../../services/admobfree.service';
import * as $ from "jquery";
var DashboardPage = /** @class */ (function () {
    function DashboardPage(admobFreeService, authService, navCtrl, storage, theme, platform, splashScreen, statusBar, alertService, router, alertCtrl) {
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
    DashboardPage.prototype.ionViewWillEnter = function () {
        //get user_info from storage
        var _this = this;
        var modalContent = "<div id=\"myModalOldGame\" class=\"at-modal\">\n                <!-- Modal content -->\n                <div class=\"at-modal-content old-game\">\n                \n                <h1 class=\"message-continue-old\">Continue Existing Game</h1>\n                <p class=\"message-continue-old\" id=\"message-continue\"></p>\n                \n                <div>\n                    <div id=\"continue-old\" class=\"bt-buy continue modal-btn\">CONTINUE</div>\n                    <div id=\"new-game\" class=\"bt-buy continue modal-btn\">START OVER</div>\n                </div>\n            \n                </div>\n            </div>";
        $('body').after(modalContent);
        this.authService.getUser().subscribe(function (data) {
            if (data["status"] === "Token is Invalid") {
                _this.router.navigate(['/login']);
            }
            _this.user = data;
            console.log(data);
            _this.twirlAndTipValue = _this.user.twirl_tip;
            _this.game_level_unlocked = _this.user.game_level_unlocked;
        }, function (error) { _this.router.navigate(['/login']); }, function () {
            _this.checkFreeSpin();
        });
    };
    //continuous old game
    DashboardPage.prototype.continuousOldGame = function () {
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
    DashboardPage.prototype.togglePopupMenu = function () {
        return this.openMenu = !this.openMenu;
    };
    DashboardPage.prototype.goToAccount = function () {
        alert('Account clicked.');
        this.togglePopupMenu();
    };
    DashboardPage.prototype.goToCups = function () {
        alert('Cups clicked.');
        this.togglePopupMenu();
    };
    DashboardPage.prototype.goToLeaderboard = function () {
        alert('Leaderboard clicked.');
        this.togglePopupMenu();
    };
    DashboardPage.prototype.getFreeCoins = function () {
        this.admobFreeService.RewardVideoAd();
    };
    DashboardPage.prototype.goToShop = function () {
        this.router.navigate(['/shops']);
    };
    DashboardPage.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        }).catch(function () {
        });
    };
    DashboardPage.prototype.ngOnInit = function () {
        this.admobFreeService.BannerAd();
    };
    DashboardPage.prototype.showInterstitial = function () {
        this.admobFreeService.InterstitialAd();
    };
    DashboardPage.prototype.showRewardVideo = function () {
        this.admobFreeService.RewardVideoAd();
    };
    DashboardPage.prototype.checkFreeSpin = function () {
        //redirect to select play option page
        var date = new Date().toJSON().slice(0, 10);
        if (this.user['date_free_spin'] <= date) {
            this.alertService.presentToast('Welcome back! You have a free spin!');
            // this.navCtrl.navigateRoot('/twirl-and-tip');
            this.router.navigate(['/twirl-and-tip']);
        }
    };
    DashboardPage.prototype.twirlAndTipModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/twirl-and-tip');
                this.router.navigate(['/twirl-and-tip']);
                return [2 /*return*/];
            });
        });
    };
    DashboardPage.prototype.settingsModel = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // this.navCtrl.navigateRoot('/settings');
                this.router.navigate(['/settings']);
                return [2 /*return*/];
            });
        });
    };
    DashboardPage.prototype.playGame = function (gameLevel, gameType, continueGame) {
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
    DashboardPage.prototype.startGame = function (gameLevel, gameType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.storage.get('save_game').then(function (data) {
                    _this.saveGameData = data;
                }).then(function () {
                    //check if savedGame = true, display continous old game
                    if (_this.saveGameData) {
                        if (_this.saveGameData['savedGame'] === true) {
                            $('#message-continue').text("You have saved game level " + _this.saveGameData.gameLevel + " on " + _this.saveGameData.timeAt + ". Do you want to start a new puzzle or play where you left off?");
                            var modal = $("#myModalOldGame");
                            modal.show();
                            $("#blur").addClass("blur-bg");
                            $(window).click(function (e) {
                                console.log(e.target.id);
                                switch (e.target.id) {
                                    case "new-game":
                                        _this.playGame(gameLevel, gameType, false);
                                        modal.hide();
                                        $("#blur").removeClass("blur-bg");
                                        break;
                                    case "continue-old":
                                        _this.playGame(_this.saveGameData.gameLevel, _this.saveGameData.gameType, true);
                                        modal.hide();
                                        $("#blur").removeClass("blur-bg");
                                        break;
                                    case "myModalOldGame":
                                        modal.hide();
                                        $("#blur").removeClass("blur-bg");
                                        break;
                                }
                            });
                            // this.continuousOldGame();
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
    DashboardPage = tslib_1.__decorate([
        Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
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
    ], DashboardPage);
    return DashboardPage;
}());
export { DashboardPage };
//# sourceMappingURL=dashboard.page.js.map