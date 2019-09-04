import { Component, OnInit } from '@angular/core';
import {AlertController, NavController, Platform} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { ThemeService } from '../../services/theme.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertService } from 'src/app/services/alert.service';
import {NavigationExtras, Router} from '@angular/router';
import { AdmobProService } from '../../services/admobfree.service';

@Component({
    selector: 'app-free-play',
    templateUrl: './free-play.page.html',
    styleUrls: ['./free-play.page.scss'],
})
export class FreePlayPage implements OnInit {
    iconSetting = 'md-settings';
    iconCoins = 'logo-usd';
    iconTwirlAndTip = 'md-disc';
    twirlAndTipValue: any = 0;
    off = false;
    dot = false;
    openMenu = false;
    saveGameData: any;

    constructor(
        private admobFreeService: AdmobProService,
        private authService: AuthService,
        private navCtrl: NavController,
        private storage: Storage,
        private theme: ThemeService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private alertService: AlertService,
        public router: Router,
        public alertCtrl: AlertController,

    ) {


        this.initializeApp();

    }

    ionViewWillEnter() {

    }

    // continuous old game
    async continuousOldGame() {
        const alert = await this.alertCtrl.create({
            header: 'Continuous Old Game',
            message: 'You have saved game level ' + this.saveGameData.gameLevel + ' on ' + this.saveGameData.timeAt + '.Do you want to start a new puzzle or play where you left off?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.storage.remove('save_game').then(function() {
                        });
                    }
                }, {
                    text: 'Play',
                    handler: () => {
                        this.playGame(this.saveGameData.gameLevel, this.saveGameData.gameType, true);

                    }
                }
            ],
            backdropDismiss: false
        });

        await alert.present();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        }).catch(() => {
        });
    }

    ngOnInit() {
        this.admobFreeService.BannerAd();
    }
    showInterstitial() {
        this.admobFreeService.InterstitialAd();
    }

    showRewardVideo() {
        this.admobFreeService.RewardVideoAd();
    }

    async settingsModel() {
        this.navCtrl.navigateRoot('/settings');
    }

    async  playGame(gameLevel, gameType, continueGame) {
        const dataSend = {
            gameLevel,
            gameType,
            continueGame,
        };
        const navigationExtras: NavigationExtras = {
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
    }

    async startGame(gameLevel, gameType) {
        this.storage.get('save_game').then((data) => {
            this.saveGameData = data;
        }).then(() => {
            // check if savedGame = true, display continous old game
            if (this.saveGameData) {
                if (this.saveGameData.savedGame === true) {
                    this.continuousOldGame();
                }
            } else {
                this.playGame(gameLevel, gameType, false);
            }
        });
    }
}
