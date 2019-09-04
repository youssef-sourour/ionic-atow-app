import * as tslib_1 from "tslib";
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
var DatabaseService = /** @class */ (function () {
    function DatabaseService(plt, sqlitePorter, sqlite, http, env, storage, authService) {
        this.plt = plt;
        this.sqlitePorter = sqlitePorter;
        this.sqlite = sqlite;
        this.http = http;
        this.env = env;
        this.storage = storage;
        this.authService = authService;
        this.dbReady = new BehaviorSubject(false);
        this.wordlibs = new BehaviorSubject([]);
        // this.plt.ready().then(() => {
        //     this.sqlite.create({
        //         name: 'wordlibs.db',
        //         location: 'default'
        //     })
        //         .then((db: SQLiteObject) => {
        //             this.database = db;
        //             this.getWordLibDB();
        //         });
        // });
    }
    DatabaseService.prototype.getWordLibDBArr = function (length, firstLastLetter) {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/get-word-lib", {
            length: length, first_last_letter: firstLastLetter
        }, { headers: headers }).pipe(tap(function (data) {
        }));
    };
    DatabaseService.prototype.getWordLibByCategory = function (length, firstLastLetter, category_id) {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/get-word-lib-by-category", {
            length: length, first_last_letter: firstLastLetter, category_id: category_id
        }, { headers: headers }).pipe(tap(function (data) {
            console.log(data);
        }));
    };
    DatabaseService.prototype.getScoreLibArr = function () {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/get-score-lib", {}, { headers: headers }).pipe(tap(function (data) {
        }));
    };
    DatabaseService.prototype.getGameMaps = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/get-game-maps", {}, { headers: headers }).pipe(tap(function (data) {
            if (data) {
                _this.storage.set('game_maps', data)
                    .then(function () {
                    console.log('Game Maps Stored');
                }, function (error) { return console.error('Error storing item', error); });
                return data;
            }
            else {
                console.log('error get game maps:' + data);
            }
        }));
    };
    DatabaseService.prototype.getLimitScores = function () {
        var _this = this;
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/get-limit-scores", {}, { headers: headers }).pipe(tap(function (data) {
            if (data) {
                _this.storage.set('limit_scores', data)
                    .then(function () {
                    console.log('limit scores Stored');
                }, function (error) { return console.error('Error storing item', error); });
                return data;
            }
            else {
                console.log('error get limit scores:' + data);
            }
        }));
    };
    // getWordLibDB() {
    //     this.http.get('assets/seed.sql', { responseType: 'text'})
    //         .subscribe(sql => {
    //             this.sqlitePorter.importSqlToDb(this.database, sql)
    //                 .then(_ => {
    //                     this.loadWordLib();
    //                     this.dbReady.next(true);
    //                 })
    //                 .catch(e => console.error(e));
    //         });
    // }
    // getDatabaseState() {
    //     return this.dbReady.asObservable();
    // }
    //
    // loadWordLib(): Observable<WordLib[]> {
    //     return this.wordlibs.asObservable();
    // }
    DatabaseService.prototype.updateScores = function (game_level, scores, unlock_new_game) {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/update-scores", {
            game_level: game_level, scores: scores, unlock_new_game: unlock_new_game
        }, { headers: headers }).pipe(tap(function (data) {
            if (data['success'] == true) {
                console.log('Update scores success');
            }
            else {
                console.log(data);
            }
        }));
    };
    DatabaseService.prototype.getScores = function () {
        var headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(this.env.API_URL + "api/database/get-scores", {}, { headers: headers }).pipe(tap(function (data) {
            if (data['success'] == true) {
                console.log('Get scores success');
            }
            else {
                console.log(data);
            }
        }));
    };
    DatabaseService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SQLitePorter,
            SQLite,
            HttpClient,
            EnvService,
            Storage,
            AuthService])
    ], DatabaseService);
    return DatabaseService;
}());
export { DatabaseService };
//# sourceMappingURL=database.service.js.map