import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FreePlayPage } from './free-play.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: FreePlayPage
    }
];
var FreePlayPageModule = /** @class */ (function () {
    function FreePlayPageModule() {
    }
    FreePlayPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [FreePlayPage]
        })
    ], FreePlayPageModule);
    return FreePlayPageModule;
}());
export { FreePlayPageModule };
//# sourceMappingURL=free-play.module.js.map