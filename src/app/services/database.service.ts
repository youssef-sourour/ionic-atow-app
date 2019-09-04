import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';

export interface WordLib {
    id: number,
    word: string,
    length: number
}

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private database: SQLiteObject;
    private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    wordlibs = new BehaviorSubject([]);

    constructor(
        private plt: Platform,
        private sqlitePorter: SQLitePorter,
        private sqlite: SQLite,
        private http: HttpClient,
        private env: EnvService,
        private storage: Storage,
        private authService: AuthService,
    ) {
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

    getWordLibDBArr(length, firstLastLetter) {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/get-word-lib`, {
            length, first_last_letter: firstLastLetter
        }, { headers }).pipe(
            tap(data => {
            })
        );
    }
    getWordLibByCategory(length, firstLastLetter, category_id) {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/get-word-lib-by-category`, {
            length, first_last_letter: firstLastLetter, category_id
        }, { headers }).pipe(
            tap(data => {
                console.log(data)
            })
        );
    }
    getScoreLibArr() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/get-score-lib`, {}, { headers }).pipe(
            tap(data => {
            })
        );
    }

    getGameMaps() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/get-game-maps`, {}, { headers }).pipe(
            tap(data => {
                if (data) {
                    this.storage.set('game_maps', data)
                        .then(
                            () => {
                                console.log('Game Maps Stored');
                            },
                            error => console.error('Error storing item', error)
                        );
                    return data;
                } else {
                    console.log('error get game maps:' + data);
                }
            })
        );
    }

    getLimitScores() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/get-limit-scores`, {}, { headers }).pipe(
            tap(data => {
                if (data) {
                    this.storage.set('limit_scores', data)
                        .then(
                            () => {
                                console.log('limit scores Stored');
                            },
                            error => console.error('Error storing item', error)
                        );
                    return data;
                } else {
                    console.log('error get limit scores:' + data);
                }
            })
        );
    }

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

    updateScores(game_level, scores, unlock_new_game) {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/update-scores`, {
            game_level, scores: scores, unlock_new_game
        }, { headers: headers }).pipe(
            tap(data => {
                if (data['success'] == true) {
                    console.log('Update scores success')
                } else {
                    console.log(data);
                }
            })
        );
    }

    getScores() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.authService.token
        });
        return this.http.post(`${this.env.API_URL}api/database/get-scores`, {}, { headers: headers }).pipe(
            tap(data => {
                if (data['success'] == true) {
                    console.log('Get scores success')
                } else {
                    console.log(data);
                }
            })
        );
    }
}