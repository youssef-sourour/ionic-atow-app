import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlphabetsKeyboardComponent } from './alphabets-keyboard/alphabets-keyboard.component';
var HelperModule = /** @class */ (function () {
    function HelperModule() {
    }
    HelperModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                IonicModule
            ],
            declarations: [
                AlphabetsKeyboardComponent,
            ],
            exports: [
                AlphabetsKeyboardComponent,
            ]
        })
    ], HelperModule);
    return HelperModule;
}());
export { HelperModule };
//# sourceMappingURL=helper.module.js.map