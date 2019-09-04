import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HintPage } from './hint.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: HintPage
    }
];
var HintPageModule = /** @class */ (function () {
    function HintPageModule() {
    }
    HintPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [HintPage]
        })
    ], HintPageModule);
    return HintPageModule;
}());
export { HintPageModule };
//# sourceMappingURL=hint.module.js.map