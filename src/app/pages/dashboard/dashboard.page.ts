import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { AdMobPro } from '@ionic-native/admob-pro/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';
import { ThemeService } from "../../services/theme.service";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationExtras, Router } from '@angular/router';
import { AdmobProService } from '../../services/admobfree.service';
import * as $ from "jquery";
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    user: any;
    game_level_unlocked: any;
    gameMaps: any;
    iconSetting = 'md-settings';
    iconCoins = 'logo-usd';
    iconTwirlAndTip = 'md-disc';
    twirlAndTipValue: any = 0;
    off = false;
    dot = false;
    openMenu = false;
    saveGameData: any;

    constructor(
        private admobProService: AdmobProService,
        private authService: AuthService,
        private navCtrl: NavController,
        private storage: Storage,
        private theme: ThemeService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private alertService: AlertService,
        public router: Router,
        private admob: AdMobPro,
        public alertCtrl: AlertController,

    ) {


        this.initializeApp();

    }
    ionViewDidLoad() {
        this.admob.onAdDismiss()
            .subscribe(() => { console.log('User dismissed ad'); });
    }
    ionViewWillEnter() {
        //get user_info from storage

        let modalContent = `<div id="myModalOldGame" class="at-modal">
                <!-- Modal content -->
                <div class="at-modal-content old-game">
                
                <h1 class="message-continue-old">Continue Existing Game</h1>
                <p class="message-continue-old" id="message-continue"></p>
                
                <div>
                    <div id="continue-old" class="bt-buy continue modal-btn">CONTINUE</div>
                    <div id="new-game" class="bt-buy continue modal-btn">START OVER</div>
                </div>
            
                </div>
            </div>`

        $('body').after(modalContent);


        this.authService.getUser().subscribe(
            data => {
                if (data["status"] === "Token is Invalid") {
                    this.router.navigate(['/login']);
                }

                this.user = data;
                console.log(data)
                this.twirlAndTipValue = this.user.twirl_tip;
                this.game_level_unlocked = this.user.game_level_unlocked;
            },
            error => { this.router.navigate(['/login']) },
            () => {
                this.checkFreeSpin();
            }
        );
    }

    //continuous old game
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
                        this.storage.remove('save_game').then(function () {
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

    togglePopupMenu() {
        return this.openMenu = !this.openMenu;
    }

    goToAccount() {
        alert('Account clicked.');
        this.togglePopupMenu();
    }

    goToCups() {
        alert('Cups clicked.');
        this.togglePopupMenu();
    }

    goToLeaderboard() {
        alert('Leaderboard clicked.');
        this.togglePopupMenu();
    }

    getFreeCoins() {
        this.admobProService.RewardVideoAd();

    }

    goToShop() {
        this.router.navigate(['/shops']);
    }

    initializeApp() {

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        }).catch(() => {
        });
    }

    ngOnInit() {
        this.admobProService.BannerAd();
    }
    showInterstitial() {
        this.admobProService.InterstitialAd();
    }

    showRewardVideo() {
        this.admobProService.RewardVideoAd();
    }

    checkFreeSpin() {
        //redirect to select play option page
        let date = new Date().toJSON().slice(0, 10);
        if (this.user['date_free_spin'] <= date) {
            this.alertService.presentToast('Welcome back! You have a free spin!');
            // this.navCtrl.navigateRoot('/twirl-and-tip');
            this.router.navigate(['/twirl-and-tip']);

        }
    }

    async twirlAndTipModel() {
        // this.navCtrl.navigateRoot('/twirl-and-tip');
        this.router.navigate(['/twirl-and-tip']);
    }

    async settingsModel() {
        // this.navCtrl.navigateRoot('/settings');
        this.router.navigate(['/settings']);
    }

    async  playGame(gameLevel, gameType, continueGame) {
        let dataSend = {
            gameLevel: gameLevel,
            gameType: gameType,
            continueGame: continueGame,
        };
        let navigationExtras: NavigationExtras = {
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
            //check if savedGame = true, display continous old game
            if (this.saveGameData) {
                if (this.saveGameData['savedGame'] === true) {
                    $('#message-continue').text(`You have saved game level ${this.saveGameData.gameLevel} on ${this.saveGameData.timeAt}. Do you want to start a new puzzle or play where you left off?`)
                    var modal = $("#myModalOldGame");
                    modal.show();
                    $("#blur").addClass("blur-bg");
                    $(window).click((e) => {
                        console.log(e.target.id)
                        switch (e.target.id) {
                            case "new-game":
                                this.playGame(gameLevel, gameType, false)
                                modal.hide();
                                $("#blur").removeClass("blur-bg");
                                break;
                            case "continue-old":
                                this.playGame(this.saveGameData.gameLevel, this.saveGameData.gameType, true);
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
            } else {
                this.playGame(gameLevel, gameType, false)
            }
        });
    }
}
