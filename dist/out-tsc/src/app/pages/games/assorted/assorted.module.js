import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AssortedPage } from './assorted.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
import { ReactiveFormsModule } from '@angular/forms';
var routes = [
    {
        path: '',
        component: AssortedPage
    }
];
var AssortedPageModule = /** @class */ (function () {
    function AssortedPageModule() {
    }
    AssortedPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                ReactiveFormsModule,
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [AssortedPage]
        })
    ], AssortedPageModule);
    return AssortedPageModule;
}());
export { AssortedPageModule };
//# sourceMappingURL=assorted.module.js.map