import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ScorePage } from './score.page';
var routes = [
    {
        path: '',
        component: ScorePage
    }
];
var ScorePageModule = /** @class */ (function () {
    function ScorePageModule() {
    }
    ScorePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ScorePage]
        })
    ], ScorePageModule);
    return ScorePageModule;
}());
export { ScorePageModule };
//# sourceMappingURL=score.module.js.map