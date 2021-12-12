import { Injectable } from '@angular/core';
import { Observable, from, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { getAuth, createUserWithEmailAndPassword, User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { ErrorService } from './error.service';
import { fromFirebaseUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = getAuth();
  private _currentUser$ = new ReplaySubject<User | null>();
  
  constructor(
    private errorService: ErrorService,
  ) { }

  getCurrentUser(): Observable<User | null> {
      return this._currentUser$.asObservable();
  }
  
  initializeAuth(): void { // called in app.component.ts
    onAuthStateChanged(this._auth, firebaseUser => {
        const user = fromFirebaseUser(firebaseUser);
        this._currentUser$.next(user);
    });
  }

  createNewUser(email: string, password: string): Observable<FirebaseUser> {
    return from(createUserWithEmailAndPassword(this._auth, email, password)).pipe(
        map(userCredential => userCredential.user),
        catchError(err => {
            throw this.errorService.handleError(err, 'An error happened while creating the account');
        }),
    )
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this._auth, email, password)).pipe(
        map(userCredential => userCredential.user),
        catchError(err => {
            throw this.errorService.handleError(err, 'An error happened while signing in');
        }),
    )
  }
}

