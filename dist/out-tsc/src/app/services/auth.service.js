import * as tslib_1 from "tslib";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';
var AuthService = /** @class */ (function () {
    function AuthService(http, storage, env) {
        this.http = http;
        this.storage = storage;
        this.env = env;
        this.isLoggedIn = false;
    }
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.http.post(this.env.API_URL + "api/auth/login", { email: email, password: password }).pipe(tap(function (data) {
            if (data['success'] == true) {
                _this.storage.set('token', data['data']['token'])
                    .then(function () {
                    console.log('Token Stored');
                }, function (error) { return console.error('Error storing item', error); });
                _this.token = data['data']['token'];
                _this.getUser()
                    .subscribe(function (response) {
                    _this.user_info = response;
                    _this.storage.set('user_info', _this.user_info).then(function (data) {
                        console.log('User Info Stored');
                    });
                });
                _this.isLoggedIn = true;
                return data['data']['token'];
            }
            else {
                console.log(data);
            }
        }));
    };
    AuthService.prototype.register = function (first_name, last_name, user_name, email, password, password_confirmation) {
        return this.http.post(this.env.API_URL + 'api/auth/register', { first_name: first_name, last_name: last_name, user_name: user_name, email: email, password: password, password_confirmation: password_confirmation });
    };
    AuthService.prototype.editUser = function (first_name, last_name, user_name, email, password, password_confirmation) {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.post(this.env.API_URL + "api/auth/edit-user", {
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }, { headers: headers }).pipe(tap(function (data) {
            if (data['success'] == true) {
                // this.getUser()
                //     .subscribe((response)=> {
                //         this.user_info = response;
                //         this.storage.set('user_info', this.user_info).then(
                //             data=> {
                //                 console.log('User Info Updated');
                //             }
                //         )
                //     });
            }
            else {
                console.log(data);
            }
        }));
    };
    AuthService.prototype.regPlayOption = function (playOption) {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.post(this.env.API_URL + "api/auth/reg-play-option", {
            play_option: playOption
        }, { headers: headers }).pipe(tap(function (data) {
            if (data['success'] == true) {
                console.log('Registered play option');
            }
            else {
                console.log(data);
            }
        }));
    };
    AuthService.prototype.logout = function () {
        this.storage.remove("token");
        console.log('Token Removed');
        this.storage.remove("user_info");
        console.log('User Info Removed');
        // const headers = new HttpHeaders({
        //     'Authorization': "Bearer "+this.token
        // });
        // return this.http.get(this.env.API_URL + 'api/auth/logout', {headers: headers})
        //     .pipe(
        //         tap(data => {
        //             this.storage.remove("token");
        //             console.log('Token Removed');
        //             this.storage.remove("user_info");
        //             console.log('User Info Removed');
        //             this.isLoggedIn = false;
        //             delete this.token;
        //             return data;
        //         })
        //     );
    };
    AuthService.prototype.getUser = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.get(this.env.API_URL + 'api/auth/user-info', { headers: headers })
            .pipe(tap(function (user) {
            _this.storage.set('user_info', user).then(function () {
                console.log('User Info Stored');
            });
            return user;
        }));
    };
    AuthService.prototype.getToken = function () {
        var _this = this;
        return this.storage.get('token').then(function (data) {
            _this.token = data;
            if (_this.token != null) {
                _this.isLoggedIn = true;
            }
            else {
                _this.isLoggedIn = false;
            }
        }, function (error) {
            _this.token = null;
            _this.isLoggedIn = false;
        });
    };
    AuthService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            Storage,
            EnvService])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map