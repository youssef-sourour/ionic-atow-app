import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../services/auth.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shops',
    templateUrl: './shops.page.html',
    styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {
    user: any;
    iconSetting = 'md-settings';
    iconTwirlAndTip = 'md-school';
    twirlAndTipValue: any = 30;
    off = false;
    dot = false;

    constructor(
        private authService: AuthService,
        private navCtrl: NavController,
        private storage: Storage,
        private theme: ThemeService,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private iap: InAppPurchase,
        private router: Router
    ) {
        this.storage.get('user_info').then((data) => {
            this.user = data;
        }).then(() => {
            //
        });
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        }).catch(() => {
        });
    }

    ngOnInit() {
    }
    goBack() {
        // this.navCtrl.back();
        this.router.navigate(["/dashboard"]);
    }
    getProduct() {
        this.iap
            .getProducts(['atow_coins_100'])
            .then((products) => {
                console.log(products);
                //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async buy(product_id) {
        this.iap
            .buy(product_id)
            .then((data) => {
                console.log(data);
                // {
                //   transactionId: ...
                //   receipt: ...
                //   signature: ...
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async buyProduct(product_id) {
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
    }
}
