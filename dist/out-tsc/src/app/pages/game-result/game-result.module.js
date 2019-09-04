import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GameResultPage } from './game-result.page';
var routes = [
    {
        path: '',
        component: GameResultPage
    }
];
var GameResultPageModule = /** @class */ (function () {
    function GameResultPageModule() {
    }
    GameResultPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [GameResultPage]
        })
    ], GameResultPageModule);
    return GameResultPageModule;
}());
export { GameResultPageModule };
//# sourceMappingURL=game-result.module.js.map