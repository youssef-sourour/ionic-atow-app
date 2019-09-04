import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListedLettersPage } from './listed-letters.page';
import { FivCenterModule, FivIconModule } from '@fivethree/core';
var routes = [
    {
        path: '',
        component: ListedLettersPage
    }
];
var ListedLettersPageModule = /** @class */ (function () {
    function ListedLettersPageModule() {
    }
    ListedLettersPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                FivIconModule,
                FivCenterModule,
            ],
            declarations: [ListedLettersPage]
        })
    ], ListedLettersPageModule);
    return ListedLettersPageModule;
}());
export { ListedLettersPageModule };
//# sourceMappingURL=listed-letters.module.js.map