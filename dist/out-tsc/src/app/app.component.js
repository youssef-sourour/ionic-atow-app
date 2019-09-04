import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(router, platform, splashScreen, statusBar, authService) {
        this.router = router;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authService = authService;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
            // this.splashScreen.hide();
            //Check if logined redirect to tabs
            _this.authService.getToken().then(function (data) {
                var isLogged = _this.authService.isLoggedIn;
                if (isLogged) {
                    _this.router.navigate(['/dashboard']);
                    // authorised so return true
                    return true;
                }
                else 
                // not logged in so redirect to login page with the return url
                {
                    _this.router.navigate(['/landing']);
                }
            });
        });
    };
    ;
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            Platform,
            SplashScreen,
            StatusBar,
            AuthService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map