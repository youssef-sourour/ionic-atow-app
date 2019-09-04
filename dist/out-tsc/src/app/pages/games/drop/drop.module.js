import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DropPage } from './drop.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: DropPage
    }
];
var DropPageModule = /** @class */ (function () {
    function DropPageModule() {
    }
    DropPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [DropPage]
        })
    ], DropPageModule);
    return DropPageModule;
}());
export { DropPageModule };
//# sourceMappingURL=drop.module.js.map