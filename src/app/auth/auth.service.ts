import { Injectable } from '@angular/core';

// sending POST request to the Express server that handles authentication
import { HttpClient } from '@angular/common/http';

// return the side effects when subscribing to the observables returned by the HttpClient methods,
import { tap } from 'rxjs/operators';

// Observable, BehaviorSubject are APIs for working with asynchronous operations
import { Observable, BehaviorSubject } from 'rxjs';

// module for persisting the access token and expiration date in the local storage
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
// import { __await } from 'tslib';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    AUTH_SERVER_ADDRESS = 'http://localhost:3100';
    authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient, private storage: Storage) { }

    register(user: User): Observable<AuthResponse> {

        // the Post Method sends the post request to AUTH_SERVER_ADDRESS/register
        // the pipe function permit to chain multiple operators
        return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
            // tap() Transparently perform actions or side-effects, such as logging.
            tap(async (res: AuthResponse) => {
                if (res.user) {
                    await this.storage.set('ACCESS_TOKEN', res.user.access_token);
                    await this.storage.set('EXPIRES_IN', res.user.expires_in);
                    this.authSubject.next(true);
                }
            })
        );
    }

    // We send a POST request with HttpClient to the /login endpoint of our Express.js server that handles JWT authentication
    // Next, we perform a side effect using the pipe() method and tap() operator available from RxJS for persist the JWT access token
    // and expiration date returned from the server.
    login(user: User): Observable<AuthResponse> {
        return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
            tap(async (res: AuthResponse) => {

                if (res.user) {
                    await this.storage.set('ACCESS_TOKEN', res.user.access_token);
                    await this.storage.set('EXPIRES_IN', res.user.expires_in);
                    this.authSubject.next(true);
                }
            })
        );
    }
    // logout method will be used for removing JWT authentication information from the local storage
    async logout() {
        await this.storage.remove('ACCESS_TOKEN');
        await this.storage.remove('EXPIRES_IN');
        // the false value in the BehaviorSubject represents the authentication state
        this.authSubject.next(false);
    }

    // isLoggedIn is used to check the current logged in users ID:
    isLoggedIn() {
        // returns an authSubject variable casted to an Observable using the asObservable() method
        return this.authSubject.asObservable();
    }
}
