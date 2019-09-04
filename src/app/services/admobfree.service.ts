import { Injectable } from "@angular/core";
// import {
//     AdMobFree,
//     AdMobFreeBannerConfig,
//     AdMobFreeInterstitialConfig,
//     AdMobFreeRewardVideoConfig
// } from '@ionic-native/admob-free/ngx';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { Platform } from '@ionic/angular';
import { TwirlAndTipService } from './twirl-and-tip.service';


@Injectable()
export class AdmobProService {

    // //Interstitial Ad's Configurations
    // interstitialConfig: AdMobFreeInterstitialConfig = {
    //     // add your config here
    //     // for the sake of this example we will just use the test config
    //     isTesting: true,
    //     autoShow: false,

    //     // id: "ca-app-pub-6084787406958367~8662582138"
    // };

    // //Reward Video Ad's Configurations
    // RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    //     isTesting: true, // Remove in production
    //     autoShow: false,

    //     // id: "ca-app-pub-6084787406958367~8662582138"
    // };

    constructor(
        // private admobFree: AdMobFree,
        private admob: AdMobPro,
        public platform: Platform,
        public freeCoins: TwirlAndTipService
    ) {

        platform.ready().then(() => {
            let adId;
            if (this.platform.is('android')) {
                adId = "ca-app-pub-6084787406958367~8662582138";
            } else if (this.platform.is('ios')) {
                adId = "ca-app-pub-6084787406958367~8662582138";
            }
            this.admob.prepareInterstitial({
                //  adId: adId,
                isTesting: true
            })
                .then(() => { this.admob.showInterstitial() });

            // Load ad configuration
            //     this.admobFree.interstitial.config(this.interstitialConfig);
            //     //Prepare Ad to Show
            //     this.admobFree.interstitial.prepare()
            //         .then(() => {
            //             // alert(1);
            //         }).catch(e => alert(e));


            //     // Load ad configuration
            //     this.admobFree.rewardVideo.config(this.RewardVideoConfig);
            //     //Prepare Ad to Show
            //     this.admobFree.rewardVideo.prepare()
            //         .then(() => {
            //             // alert(2);
            //         }).catch(e => alert(e));

            // });

            // //Handle interstitial's close event to Prepare Ad again
            // this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
            //     this.admobFree.interstitial.prepare()
            //         .then(() => {
            //             alert("Interstitial CLOSE");
            //         }).catch(e => alert(e));
            // });
            // //Handle Reward's close event to Prepare Ad again
            // this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(() => {
            //     this.admobFree.rewardVideo.prepare()
            //         .then(() => {
            //             alert("Reward Video CLOSE");
            //         }).catch(e => alert(e));
        });
    }


    BannerAd() {
        // let bannerConfig: AdMobFreeBannerConfig = {
        //     isTesting: true, // Remove in production
        //     autoShow: true,
        //     bannerAtTop: true,

        //     // id: "ca-app-pub-6084787406958367~8662582138"
        // };
        // this.admobFree.banner.config(bannerConfig);

        // this.admobFree.banner.prepare().then(() => {
        //     // success
        //     console.log('ads success')
        // }).catch(e => alert(e));
        if (this.admob) this.admob.createBanner({
            // adId: "ca-app-pub-6084787406958367~8662582138",
            isTesting: true,
            position: this.admob.AD_POSITION.TOP_CENTER,
            autoShow: true,
            adSize:"CUSTOM",
            width:360,
            height:70,
            overlap:false
        });

    }

    InterstitialAd() {
        let adId;
        if (this.platform.is('android')) {
            adId = "ca-app-pub-6084787406958367~8662582138";
        } else if (this.platform.is('ios')) {
            adId = "ca-app-pub-6084787406958367~8662582138";
        }
        this.admob.prepareInterstitial({ adId: adId })
            .then(() => { this.admob.showInterstitial() });
    }

    RewardVideoAd() {
        let adId;
        if (this.platform.is('android')) {
            adId = "ca-app-pub-6084787406958367~8662582138";
        } else if (this.platform.is('ios')) {
            adId = "ca-app-pub-6084787406958367~8662582138";
        }
        this.admob.prepareRewardVideoAd({ isTesting: true });
    }


}