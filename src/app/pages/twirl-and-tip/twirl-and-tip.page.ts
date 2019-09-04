import { Component, ElementRef, OnInit } from '@angular/core';
import { TwirlAndTipService } from '../../services/twirl-and-tip.service';
import { AlertService } from '../../services/alert.service';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
@Component({
    selector: 'app-twirl-and-tip',
    templateUrl: './twirl-and-tip.page.html',
    styleUrls: ['./twirl-and-tip.page.scss'],
})
export class TwirlAndTipPage implements OnInit {
    disableBtn: any = 0;
    user: any;
    bonusCoinsPoint: any = 0;

    constructor(
        private twirlAndTipService: TwirlAndTipService,
        private alertService: AlertService,
        private navCtrl: NavController,
        private storage: Storage,
        private element: ElementRef,
        private authService: AuthService,
        public alertCtrl: AlertController,
        private router: Router
    ) {

    }
    ionViewWillEnter() {
        this.storage.get('user_info').then((data) => {

            this.user = data;
            let toDate = new Date().toJSON().slice(0, 10);
            if (this.user.date_free_spin > toDate) {
                this.alertService.presentToast('Please come back tomorrow!');
                this.disableBtn = 1;
            } else {
                this.disableBtn = 0;
            }
        });
    }
    ngOnInit() {


    }


    ngAfterViewInit(): void {
        if (!$("#myModalTwirl").length) {

            let modalContent = `<div id="myModalTwirl" class="at-modal">
                <!-- Modal content -->
                <div class="at-modal-content twirl">
                
                <h1 style="margin-top: 40px;">Daily Reward</h1>
                <h1>Congratulations</h1>
                <p class="your-coin"></p>
                <ion-img class="p-coin" src="../../../assets/imgs/pop-up/p-coin.png" ></ion-img>
                <br/>
                <br/><br/>
                <div>
                
                    <button id="goToDashboard" class="bt-buy">COLLECT</button>
                </div>
            
                </div>
            </div>`

            $('body').after(modalContent);

        }

    }

    updateScore(spin_result) {
        this.twirlAndTipService.updateTAT(spin_result).subscribe(
            data => {
                this.user.twirl_tip += data['bonusTATPoint'];
                let tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toJSON().slice(0, 10);
                this.bonusCoinsPoint = data['bonusTATPoint'];

                $('.your-coin').text(this.bonusCoinsPoint);

                this.authService.getUser().subscribe(
                    data => {

                    },
                    error => { },
                    () => {
                    }
                );
            },
            error => {
                console.log(error);
            },
            () => {
                // this.alertGetCoins(this.bonusCoinsPoint);
                var modal = $("#myModalTwirl");
                modal.show();
                $("#blur").addClass("blur-bg");
                $(window).click((e) => {
                    // if (e.target.id === "myModalTwirl") {
                    //     modal.hide();
                    //     $("#blur").removeClass("blur-bg");
                    // }
                    if (e.target.id === "goToDashboard") {
                        // this.navCtrl.navigateRoot("/dashboard");
                        this.router.navigate(['/dashboard']);
                        modal.hide();
                        $("#blur").removeClass("blur-bg");
                    }
                });

            }
        );
    }

    // alert if no word with first and last letter
    async alertGetCoins(coins) {

        const alertGetCoins = await this.alertCtrl.create({
            header: 'Congratulations!',
            message: 'You get ' + coins + ' coins',
            buttons: [{
                text: 'Back To Level Map',
                handler: () => {
                    // this.navCtrl.navigateRoot('/dashboard');
                    this.router.navigate[('/dashboard')];
                }
            }],
            backdropDismiss: false
        });
        alertGetCoins.present();
    }

    delay(ms) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, ms);
        });
    }

    onStartClick() {
        this.disableBtn = 1;
        let randomInt = (Math.round(Math.random() * 9)) + 1;
        let deg = 675 + randomInt * 90;
        let spin_result = '';
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
        this.delay(4000).then(
            () => {
                this.updateScore(spin_result);
            }
        )
    }
    goBack() {
        this.router.navigate(['/dashboard'])
    }

}
