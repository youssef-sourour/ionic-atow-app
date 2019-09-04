import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Storage } from '@ionic/storage';
import { ThemeService } from "../../services/theme.service";
var themes = {
    spring: {
        primary: '#F78154',
        secondary: '#4D9078',
        tertiary: '#B4436C',
        light: '#FDE8DF',
        medium: '#FCD0A2',
        dark: '#B89876'
    },
    summer: {
        primary: '#8CBA80',
        secondary: '#FCFF6C',
        tertiary: '#FE5F55',
        medium: '#BCC2C7',
        dark: '#F7F7FF',
        light: '#495867'
    },
    autumn: {
        primary: '#39BFBD',
        secondary: '#4CE0B3',
        tertiary: '#FF5E79',
        light: '#F4EDF2',
        medium: '#B682A5',
        dark: '#34162A'
    },
    winter: {
        primary: '#a1bf06',
        secondary: '#a8bde0',
        tertiary: '#a346ff',
        light: '#F4EDF2',
        medium: '#B682A5',
        dark: '#34162A'
    }
};
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, authService, storage, theme) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.storage = storage;
        this.theme = theme;
        this.disableAllSound = true;
        this.disableSpringSound = true;
        this.disableSummerSound = true;
        this.disableAutumnSound = true;
        this.disableWinterSound = true;
        this.themeList = ['Spring', 'Summer', 'Autumn', 'Winter'];
        this.storage.get('user_info').then(function (data) {
            _this.user = data;
        });
    }
    SettingsPage.prototype.ngOnInit = function () {
    };
    SettingsPage.prototype.editProfile = function () {
        this.navCtrl.navigateForward('edit-profile');
    };
    SettingsPage.prototype.logout = function () {
        this.authService.logout();
        this.navCtrl.navigateRoot('/landing');
    };
    SettingsPage.prototype.changeTheme = function () {
        this.themeItem = this.themeItem.toLowerCase();
        console.log(this.themeItem);
        this.theme.setTheme(themes[this.themeItem]);
    };
    SettingsPage = tslib_1.__decorate([
        Component({
            selector: 'app-settings',
            templateUrl: './settings.page.html',
            styleUrls: ['./settings.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AuthService,
            Storage,
            ThemeService])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.page.js.map