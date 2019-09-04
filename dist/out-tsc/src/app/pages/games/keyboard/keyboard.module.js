import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { KeyboardPage } from './keyboard.page';
var routes = [
    {
        path: '',
        component: KeyboardPage
    }
];
var KeyboardPageModule = /** @class */ (function () {
    function KeyboardPageModule() {
    }
    KeyboardPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [KeyboardPage]
        })
    ], KeyboardPageModule);
    return KeyboardPageModule;
}());
export { KeyboardPageModule };
//# sourceMappingURL=keyboard.module.js.map