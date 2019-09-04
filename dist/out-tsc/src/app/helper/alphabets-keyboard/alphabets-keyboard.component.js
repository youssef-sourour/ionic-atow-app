import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var AlphabetsKeyboardComponent = /** @class */ (function () {
    function AlphabetsKeyboardComponent() {
    }
    AlphabetsKeyboardComponent.prototype.ngOnInit = function () { };
    AlphabetsKeyboardComponent.prototype.setLetter = function (letterSelected) {
        return this.letterSelected = letterSelected;
    };
    AlphabetsKeyboardComponent = tslib_1.__decorate([
        Component({
            selector: 'app-alphabets-keyboard',
            templateUrl: './alphabets-keyboard.component.html',
            styleUrls: ['./alphabets-keyboard.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AlphabetsKeyboardComponent);
    return AlphabetsKeyboardComponent;
}());
export { AlphabetsKeyboardComponent };
//# sourceMappingURL=alphabets-keyboard.component.js.map