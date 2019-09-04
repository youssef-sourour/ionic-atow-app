import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {Storage} from '@ionic/storage';
import { ThemeService } from "../../services/theme.service";
const themes = {
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
@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
    user: any;
    themeItem: any;
    disableAllSound: any = true;
    disableSpringSound: any = true;
    disableSummerSound: any = true;
    disableAutumnSound: any = true;
    disableWinterSound: any = true;
    themeList: any = ['Spring', 'Summer', 'Autumn', 'Winter'];

    constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private storage: Storage,
        private theme: ThemeService
    ) {
        this.storage.get('user_info').then((data) => {
            this.user = data;
        });
    }

    ngOnInit() {
    }

    editProfile() {
        this.navCtrl.navigateForward('edit-profile');
    }

    logout() {
        this.authService.logout();
        this.navCtrl.navigateRoot('/landing');
    }

    changeTheme() {
        this.themeItem = this.themeItem.toLowerCase();
        console.log(this.themeItem);
        this.theme.setTheme(themes[this.themeItem]);
    }

}
