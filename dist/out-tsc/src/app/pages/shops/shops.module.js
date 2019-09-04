import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ShopsPage } from './shops.page';
var routes = [
    {
        path: '',
        component: ShopsPage
    }
];
var ShopsPageModule = /** @class */ (function () {
    function ShopsPageModule() {
    }
    ShopsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ShopsPage]
        })
    ], ShopsPageModule);
    return ShopsPageModule;
}());
export { ShopsPageModule };
//# sourceMappingURL=shops.module.js.map