import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BasicPage } from './basic.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
import { HelperModule } from '../../../helper/helper.module';
import { KeyboardPage } from '../keyboard/keyboard.page';
var routes = [
    {
        path: '',
        component: BasicPage
    }
];
var BasicPageModule = /** @class */ (function () {
    function BasicPageModule() {
    }
    BasicPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
                HelperModule,
                ReactiveFormsModule
            ],
            exports: [BasicPage],
            declarations: [BasicPage, KeyboardPage],
        })
    ], BasicPageModule);
    return BasicPageModule;
}());
export { BasicPageModule };
//# sourceMappingURL=basic.module.js.map