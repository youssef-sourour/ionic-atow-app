import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    token: any;
    user_info: any;

    constructor(
        private http: HttpClient,
        private storage: Storage,
        private env: EnvService,
    ) {
    }

    login(email: String, password: String) {
        return this.http.post(`${this.env.API_URL}api/auth/login`, { email: email, password: password }).pipe(
            tap(data => {

                if (data['success'] == true) {
                    this.storage.set('token', data['data']['token'])
                        .then(
                            () => {
                                console.log('Token Stored');
                            },
                            error => console.error('Error storing item', error)
                        );
                    this.token = data['data']['token'];
                    this.getUser()
                        .subscribe((response) => {
                            this.user_info = response;
                            this.storage.set('user_info', this.user_info).then(
                                data => {
                                    console.log('User Info Stored');
                                }
                            )
                        });
                    this.isLoggedIn = true;
                    return data['data']['token'];
                } else {
                    console.log(data);
                }
            })
        );
    }

    register(first_name: String, last_name: String, user_name: String, email: String, password: String, password_confirmation: String) {
        return this.http.post(this.env.API_URL + 'api/auth/register',
            { first_name: first_name, last_name: last_name, user_name: user_name, email: email, password: password, password_confirmation: password_confirmation }
        );
    }

    editUser(first_name: String, last_name: String, user_name: String, email: String, password: String, password_confirmation: String) {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.post(`${this.env.API_URL}api/auth/edit-user`, {
            first_name: first_name,
            last_name: last_name,
            user_name: user_name,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        }, { headers: headers }).pipe(
            tap(data => {
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
                } else {
                    console.log(data);
                }
            })
        );
    }

    regPlayOption(playOption) {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.post(`${this.env.API_URL}api/auth/reg-play-option`, {
            play_option: playOption
        }, { headers }).pipe(
            tap(data => {
                if (data['success'] == true) {
                    console.log('Registered play option')
                } else {
                    console.log(data);
                }
            })
        );
    }

    logout() {
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
    }

    getUser() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer " + this.token
        });
        return this.http.get(this.env.API_URL + 'api/auth/user-info', { headers: headers })
            .pipe(
                tap(user => {
                    this.storage.set('user_info', user).then(
                        () => {
                            console.log('User Info Stored');
                        }
                    );
                    return user;
                })
            );
    }

    getToken() {
        return this.storage.get('token').then(
            data => {
                this.token = data;
                if (this.token != null) {
                    this.isLoggedIn = true;
                } else {
                    this.isLoggedIn = false;
                }
            },
            error => {
                this.token = null;
                this.isLoggedIn = false;
            }
        );
    }
}
