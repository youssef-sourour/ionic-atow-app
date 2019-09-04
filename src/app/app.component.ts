import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private router: Router,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
    ) {
        this.initializeApp();
    }
   
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
            // this.splashScreen.hide();
            //Check if logined redirect to tabs
            this.authService.getToken().then(
                data => {
                    const isLogged = this.authService.isLoggedIn;
                    if (isLogged) {
                        this.router.navigate(['/dashboard']);
                        // authorised so return true
                        return true;
                    }
                    else
                    // not logged in so redirect to login page with the return url
                    {
                        this.router.navigate(['/landing']);
                    }
                }
            );
        });
    };
}
