import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SettingsPage } from './settings.page';
var routes = [
    {
        path: '',
        component: SettingsPage
    }
];
var SettingsPageModule = /** @class */ (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SettingsPage]
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());
export { SettingsPageModule };
//# sourceMappingURL=settings.module.js.map