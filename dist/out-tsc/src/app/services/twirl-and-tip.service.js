import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
var TwirlAndTipService = /** @class */ (function () {
    function TwirlAndTipService(http, storage, env) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.env = env;
        this.storage.get('token').then(function (data) {
            _this.token = data;
        });
    }
    TwirlAndTipService.prototype.updateTAT = function (spin_result) {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.post(this.env.API_URL + "api/auth/update-tat", { spin_result: spin_result }, { headers: headers }).pipe(tap(function (data) {
            if (data['success'] == true) {
                return data;
            }
            else {
                console.log(data);
            }
        }));
    };
    TwirlAndTipService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Storage,
            EnvService])
    ], TwirlAndTipService);
    return TwirlAndTipService;
}());
export { TwirlAndTipService };
//# sourceMappingURL=twirl-and-tip.service.js.map