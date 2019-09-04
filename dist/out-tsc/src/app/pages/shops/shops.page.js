import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { Router } from '@angular/router';
var ShopsPage = /** @class */ (function () {
    function ShopsPage(authService, navCtrl, storage, theme, platform, splashScreen, statusBar, iap, router) {
        var _this = this;
        this.authService = authService;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.theme = theme;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.iap = iap;
        this.router = router;
        this.iconSetting = 'md-settings';
        this.iconTwirlAndTip = 'md-school';
        this.twirlAndTipValue = 30;
        this.off = false;
        this.dot = false;
        this.storage.get('user_info').then(function (data) {
            _this.user = data;
        }).then(function () {
            //
        });
        this.initializeApp();
    }
    ShopsPage.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        }).catch(function () {
        });
    };
    ShopsPage.prototype.ngOnInit = function () {
    };
    ShopsPage.prototype.goBack = function () {
        // this.navCtrl.back();
        this.router.navigate(["/dashboard"]);
    };
    ShopsPage.prototype.getProduct = function () {
        this.iap
            .getProducts(['atow_coins_100'])
            .then(function (products) {
            console.log(products);
            //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    ShopsPage.prototype.buy = function (product_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.iap
                    .buy(product_id)
                    .then(function (data) {
                    console.log(data);
                    // {
                    //   transactionId: ...
                    //   receipt: ...
                    //   signature: ...
                    // }
                })
                    .catch(function (err) {
                    console.log(err);
                });
                return [2 /*return*/];
            });
        });
    };
    ShopsPage.prototype.buyProduct = function (product_id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (product_id) {
                    case 'atow_coins_200':
                        this.buy(product_id);
                        break;
                    case 'atow_coins_400':
                        this.buy(product_id);
                        break;
                    case 'atow_coins_750':
                        this.buy(product_id);
                        break;
                    case 'atow_coins_1000':
                        this.buy(product_id);
                        break;
                    case 'atow_no_ads':
                        this.buy(product_id);
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    ShopsPage = tslib_1.__decorate([
        Component({
            selector: 'app-shops',
            templateUrl: './shops.page.html',
            styleUrls: ['./shops.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthService,
            NavController,
            Storage,
            ThemeService,
            Platform,
            SplashScreen,
            StatusBar,
            InAppPurchase,
            Router])
    ], ShopsPage);
    return ShopsPage;
}());
export { ShopsPage };
//# sourceMappingURL=shops.page.js.map