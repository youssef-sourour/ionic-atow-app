import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var EnvService = /** @class */ (function () {
    // API_URL = 'http://atow.test/';
    function EnvService() {
        // API_URL = 'http://localhost:8000/';
        // API_URL = 'http://10.0.2.2:8000/';
        this.API_URL = 'https://atow-api.emergedigital.com/';
    }
    EnvService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], EnvService);
    return EnvService;
}());
export { EnvService };
//# sourceMappingURL=env.service.js.map