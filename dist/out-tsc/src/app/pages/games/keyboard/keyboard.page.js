import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
var KeyboardPage = /** @class */ (function () {
    function KeyboardPage() {
        this.onSelectLetter = new EventEmitter();
    }
    KeyboardPage.prototype.ngOnInit = function () {
    };
    KeyboardPage.prototype.selectLetter = function (letterSelected) {
        this.onSelectLetter.next({ letterSelected: letterSelected });
    };
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], KeyboardPage.prototype, "onSelectLetter", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], KeyboardPage.prototype, "openKeyboard", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], KeyboardPage.prototype, "keyObj", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Function)
    ], KeyboardPage.prototype, "chooseHint", void 0);
    KeyboardPage = tslib_1.__decorate([
        Component({
            selector: 'app-keyboard',
            templateUrl: './keyboard.page.html',
            styleUrls: ['./keyboard.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], KeyboardPage);
    return KeyboardPage;
}());
export { KeyboardPage };
//# sourceMappingURL=keyboard.page.js.map