import * as tslib_1 from "tslib";
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'node_modules/color';
import { Storage } from '@ionic/storage';
var ThemeService = /** @class */ (function () {
    function ThemeService(document, storage) {
        var _this = this;
        this.document = document;
        this.storage = storage;
        storage.get('theme').then(function (cssText) {
            _this.setGlobalCSS(cssText);
        });
    }
    // Override all global variables with a new theme
    ThemeService.prototype.setTheme = function (theme) {
        // const cssText = CSSTextGenerator(theme);
        // this.setGlobalCSS(cssText);
        // this.storage.set('theme', cssText);
    };
    // Define a single CSS variable
    ThemeService.prototype.setVariable = function (name, value) {
        this.document.documentElement.style.setProperty(name, value);
    };
    ThemeService.prototype.setGlobalCSS = function (css) {
        this.document.documentElement.style.cssText = css;
    };
    Object.defineProperty(ThemeService.prototype, "storedTheme", {
        get: function () {
            return this.storage.get('theme');
        },
        enumerable: true,
        configurable: true
    });
    ThemeService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(0, Inject(DOCUMENT)),
        tslib_1.__metadata("design:paramtypes", [Document,
            Storage])
    ], ThemeService);
    return ThemeService;
}());
export { ThemeService };
var defaults = {
    primary: '#3880ff',
    secondary: '#0cd1e8',
    tertiary: '#7044ff',
    success: '#10dc60',
    warning: '#ffce00',
    danger: '#f04141',
    dark: '#222428',
    medium: '#989aa2',
    light: '#f4f5f8'
};
function CSSTextGenerator(colors) {
    colors = tslib_1.__assign({}, defaults, colors);
    var primary = colors.primary, secondary = colors.secondary, tertiary = colors.tertiary, success = colors.success, warning = colors.warning, danger = colors.danger, dark = colors.dark, medium = colors.medium, light = colors.light;
    var shadeRatio = 0.1;
    var tintRatio = 0.1;
    return "\n    --ion-color-base: " + light + ";\n    --ion-color-contrast: " + dark + ";\n    --ion-background-color: " + light + ";\n    --ion-text-color: " + dark + ";\n    --ion-toolbar-background-color: " + contrast(light, 0.1) + ";\n    --ion-toolbar-text-color: " + contrast(dark, 0.1) + ";\n    --ion-item-background-color: " + contrast(light, 0.3) + ";\n    --ion-item-text-color: " + contrast(dark, 0.3) + ";\n    --ion-color-primary: " + primary + ";\n    --ion-color-primary-rgb: 56,128,255;\n    --ion-color-primary-contrast: " + contrast(primary) + ";\n    --ion-color-primary-contrast-rgb: 255,255,255;\n    --ion-color-primary-shade:  " + Color(primary).darken(shadeRatio) + ";\n    --ion-color-primary-tint:  " + Color(primary).lighten(tintRatio) + ";\n    --ion-color-secondary: " + secondary + ";\n    --ion-color-secondary-rgb: 12,209,232;\n    --ion-color-secondary-contrast: " + contrast(secondary) + ";\n    --ion-color-secondary-contrast-rgb: 255,255,255;\n    --ion-color-secondary-shade:  " + Color(secondary).darken(shadeRatio) + ";\n    --ion-color-secondary-tint: " + Color(secondary).lighten(tintRatio) + ";\n    --ion-color-tertiary:  " + tertiary + ";\n    --ion-color-tertiary-rgb: 112,68,255;\n    --ion-color-tertiary-contrast: " + contrast(tertiary) + ";\n    --ion-color-tertiary-contrast-rgb: 255,255,255;\n    --ion-color-tertiary-shade: " + Color(tertiary).darken(shadeRatio) + ";\n    --ion-color-tertiary-tint:  " + Color(tertiary).lighten(tintRatio) + ";\n    --ion-color-success: " + success + ";\n    --ion-color-success-rgb: 16,220,96;\n    --ion-color-success-contrast: " + contrast(success) + ";\n    --ion-color-success-contrast-rgb: 255,255,255;\n    --ion-color-success-shade: " + Color(success).darken(shadeRatio) + ";\n    --ion-color-success-tint: " + Color(success).lighten(tintRatio) + ";\n    --ion-color-warning: " + warning + ";\n    --ion-color-warning-rgb: 255,206,0;\n    --ion-color-warning-contrast: " + contrast(warning) + ";\n    --ion-color-warning-contrast-rgb: 255,255,255;\n    --ion-color-warning-shade: " + Color(warning).darken(shadeRatio) + ";\n    --ion-color-warning-tint: " + Color(warning).lighten(tintRatio) + ";\n    --ion-color-danger: " + danger + ";\n    --ion-color-danger-rgb: 245,61,61;\n    --ion-color-danger-contrast: " + contrast(danger) + ";\n    --ion-color-danger-contrast-rgb: 255,255,255;\n    --ion-color-danger-shade: " + Color(danger).darken(shadeRatio) + ";\n    --ion-color-danger-tint: " + Color(danger).lighten(tintRatio) + ";\n    --ion-color-dark: " + dark + ";\n    --ion-color-dark-rgb: 34,34,34;\n    --ion-color-dark-contrast: " + contrast(dark) + ";\n    --ion-color-dark-contrast-rgb: 255,255,255;\n    --ion-color-dark-shade: " + Color(dark).darken(shadeRatio) + ";\n    --ion-color-dark-tint: " + Color(dark).lighten(tintRatio) + ";\n    --ion-color-medium: " + medium + ";\n    --ion-color-medium-rgb: 152,154,162;\n    --ion-color-medium-contrast: " + contrast(medium) + ";\n    --ion-color-medium-contrast-rgb: 255,255,255;\n    --ion-color-medium-shade: " + Color(medium).darken(shadeRatio) + ";\n    --ion-color-medium-tint: " + Color(medium).lighten(tintRatio) + ";\n    --ion-color-light: " + light + ";\n    --ion-color-light-rgb: 244,244,244;\n    --ion-color-light-contrast: $" + contrast(light) + ";\n    --ion-color-light-contrast-rgb: 0,0,0;\n    --ion-color-light-shade: " + Color(light).darken(shadeRatio) + ";\n    --ion-color-light-tint: " + Color(light).lighten(tintRatio) + ";";
}
function contrast(color, ratio) {
    if (ratio === void 0) { ratio = 0.8; }
    color = Color(color);
    return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}
//# sourceMappingURL=theme.service.js.map