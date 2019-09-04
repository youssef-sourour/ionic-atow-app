import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {EnvService} from './env.service';

@Injectable({
    providedIn: 'root'
})
export class TwirlAndTipService {
    token: any;
    constructor(
        private http: HttpClient,
        private storage: Storage,
        private env: EnvService,
    ) {
        this.storage.get('token').then(
            data=>{
                this.token = data;
            }
        );
    }

    updateTAT(spin_result:String){
        const headers = new HttpHeaders({
            'Authorization': "Bearer "+this.token
        });
        return this.http.post(`${this.env.API_URL}api/auth/update-tat`, {spin_result:spin_result}, {headers: headers}).pipe(
            tap(data => {
                if (data['success'] == true) {
                    return data;
                } else {
                    console.log(data);
                }
            })
        );
    }
}
