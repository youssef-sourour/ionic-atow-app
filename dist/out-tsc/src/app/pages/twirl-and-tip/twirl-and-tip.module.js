import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TwirlAndTipPage } from './twirl-and-tip.page';
var routes = [
    {
        path: '',
        component: TwirlAndTipPage
    }
];
var TwirlAndTipPageModule = /** @class */ (function () {
    function TwirlAndTipPageModule() {
    }
    TwirlAndTipPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TwirlAndTipPage]
        })
    ], TwirlAndTipPageModule);
    return TwirlAndTipPageModule;
}());
export { TwirlAndTipPageModule };
//# sourceMappingURL=twirl-and-tip.module.js.map