import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// Observable, BehaviorSubject are APIs for working with asynchronous operations
import { Observable, BehaviorSubject } from 'rxjs';

// module for persisting the access token and expiration date in the local storage
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // AUTH_SERVER_ADDRESS = 'http://localhost:3000';
    AUTH_SERVER_ADDRESS = 'https://app-stg.xng.rocks';

    authSubject = new BehaviorSubject(false);

    constructor(private httpClient: HttpClient, private storage: Storage) { }

    // We send a POST request to the AUTH_SERVER_ADDRESS/login
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
