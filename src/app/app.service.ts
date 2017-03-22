import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { InterceptorService  } from 'ng2-interceptors';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
    constructor (private http: InterceptorService) {

    }
    userLogin(params?: any) {
        return this.request('user/login', params)
    }
    request(url:string, params? :any) {
        let header = new Headers({'content-type': 'application/json'})
        return this.http.post(url, params, header).toPromise()
    }
}