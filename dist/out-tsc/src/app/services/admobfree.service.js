import * as tslib_1 from "tslib";
import { Injectable } from "@angular/core";
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { Platform } from '@ionic/angular';
import { TwirlAndTipService } from './twirl-and-tip.service';
var AdmobFreeService = /** @class */ (function () {
    function AdmobFreeService(admobFree, platform, freeCoins) {
        var _this = this;
        this.admobFree = admobFree;
        this.platform = platform;
        this.freeCoins = freeCoins;
        //Interstitial Ad's Configurations
        this.interstitialConfig = {
            // add your config here
            // for the sake of this example we will just use the test config
            isTesting: false,
            autoShow: false,
            id: "ca-app-pub-6084787406958367~8662582138"
        };
        //Reward Video Ad's Configurations
        this.RewardVideoConfig = {
            isTesting: false,
            autoShow: false,
            id: "ca-app-pub-6084787406958367~8662582138"
        };
        platform.ready().then(function () {
            // Load ad configuration
            _this.admobFree.interstitial.config(_this.interstitialConfig);
            //Prepare Ad to Show
            _this.admobFree.interstitial.prepare()
                .then(function () {
                // alert(1);
            }).catch(function (e) { return alert(e); });
            // Load ad configuration
            _this.admobFree.rewardVideo.config(_this.RewardVideoConfig);
            //Prepare Ad to Show
            _this.admobFree.rewardVideo.prepare()
                .then(function () {
                // alert(2);
            }).catch(function (e) { return alert(e); });
        });
        //Handle interstitial's close event to Prepare Ad again
        this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(function () {
            _this.admobFree.interstitial.prepare()
                .then(function () {
                alert("Interstitial CLOSE");
            }).catch(function (e) { return alert(e); });
        });
        //Handle Reward's close event to Prepare Ad again
        this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(function () {
            _this.admobFree.rewardVideo.prepare()
                .then(function () {
                alert("Reward Video CLOSE");
            }).catch(function (e) { return alert(e); });
        });
    }
    AdmobFreeService.prototype.BannerAd = function () {
        var bannerConfig = {
            isTesting: false,
            autoShow: true,
            bannerAtTop: true,
            id: "ca-app-pub-6084787406958367~8662582138"
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner.prepare().then(function () {
            // success
            console.log('ads success');
        }).catch(function (e) { return alert(e); });
    };
    AdmobFreeService.prototype.InterstitialAd = function () {
        var _this = this;
        //Check if Ad is loaded
        this.admobFree.interstitial.isReady().then(function () {
            //Will show prepared Ad
            _this.admobFree.interstitial.show().then(function () {
            })
                .catch(function (e) { return alert("show " + e); });
        })
            .catch(function (e) { return alert("isReady " + e); });
    };
    AdmobFreeService.prototype.RewardVideoAd = function () {
        var _this = this;
        //Check if Ad is loaded
        this.admobFree.rewardVideo.isReady().then(function () {
            //Will show prepared Ad
            _this.admobFree.rewardVideo.show().then(function () {
                _this.freeCoins.updateTAT('rewardVideoAd');
            })
                .catch(function (e) { return alert("show " + e); });
        })
            .catch(function (e) { return alert("isReady " + e); });
    };
    AdmobFreeService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [AdMobFree,
            Platform,
            TwirlAndTipService])
    ], AdmobFreeService);
    return AdmobFreeService;
}());
export { AdmobFreeService };
//# sourceMappingURL=admobfree.service.js.map