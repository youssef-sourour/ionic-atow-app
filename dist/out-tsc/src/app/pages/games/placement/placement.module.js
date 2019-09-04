import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PlacementPage } from './placement.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: PlacementPage
    }
];
var PlacementPageModule = /** @class */ (function () {
    function PlacementPageModule() {
    }
    PlacementPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [PlacementPage]
        })
    ], PlacementPageModule);
    return PlacementPageModule;
}());
export { PlacementPageModule };
//# sourceMappingURL=placement.module.js.map