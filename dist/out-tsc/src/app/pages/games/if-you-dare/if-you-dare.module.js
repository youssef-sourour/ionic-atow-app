import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IfYouDarePage } from './if-you-dare.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: IfYouDarePage
    }
];
var IfYouDarePageModule = /** @class */ (function () {
    function IfYouDarePageModule() {
    }
    IfYouDarePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [IfYouDarePage]
        })
    ], IfYouDarePageModule);
    return IfYouDarePageModule;
}());
export { IfYouDarePageModule };
//# sourceMappingURL=if-you-dare.module.js.map