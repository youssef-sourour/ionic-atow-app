import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChoosePlayOptionPage } from './choose-play-option.page';
var routes = [
    {
        path: '',
        component: ChoosePlayOptionPage
    }
];
var ChoosePlayOptionPageModule = /** @class */ (function () {
    function ChoosePlayOptionPageModule() {
    }
    ChoosePlayOptionPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ChoosePlayOptionPage]
        })
    ], ChoosePlayOptionPageModule);
    return ChoosePlayOptionPageModule;
}());
export { ChoosePlayOptionPageModule };
//# sourceMappingURL=choose-play-option.module.js.map