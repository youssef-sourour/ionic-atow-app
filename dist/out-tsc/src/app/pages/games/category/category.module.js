import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CategoryPage } from './category.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: CategoryPage
    }
];
var CategoryPageModule = /** @class */ (function () {
    function CategoryPageModule() {
    }
    CategoryPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [CategoryPage]
        })
    ], CategoryPageModule);
    return CategoryPageModule;
}());
export { CategoryPageModule };
//# sourceMappingURL=category.module.js.map