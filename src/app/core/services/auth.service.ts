import { Injectable } from '@angular/core';
import { Observable, from, ReplaySubject } from 'rxjs';
import { map, catchError, take, switchMap, mapTo } from 'rxjs/operators';
import { getAuth, createUserWithEmailAndPassword, User as FirebaseUser, onAuthStateChanged, Auth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ErrorService } from './error.service';
import { fromFirebaseUser, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth$ = new ReplaySubject<Auth>(1);
  private _currentUser$ = new ReplaySubject<User | null>(1);
  
  constructor(
    private errorService: ErrorService,
  ) { }

  initializeAuth(): void { // called in app.component.ts
    // initialize auth
    this._auth$.next(getAuth());

    // listen auth changes
    this._auth$.pipe(take(1)).subscribe(auth => onAuthStateChanged(auth, firebaseUser => {
        const user = fromFirebaseUser(firebaseUser);
        this._currentUser$.next(user);
    }));
  }

  getCurrentUser(): Observable<User | null> {
      return this._currentUser$.asObservable();
  }

  createNewUser(email: string, password: string): Observable<User | null> {
    return this._auth$.pipe(
        take(1),
        switchMap(auth => from(createUserWithEmailAndPassword(auth, email, password))),
        map(userCredential => fromFirebaseUser(userCredential.user)),
        catchError(err => {
            throw this.errorService.handleError(err, 'An error happened while creating the account');
        }),
    );
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<User | null> {
    return this._auth$.pipe(
        take(1),
        switchMap(auth => from(signInWithEmailAndPassword(auth, email, password))),
        map(userCredential => fromFirebaseUser(userCredential.user)),
        catchError(err => {
            throw this.errorService.handleError(err, 'An error happened while creating the account');
        }),
    );
  }

  logout(): Observable<unknown> {
    return this._auth$.pipe(
        take(1),
        switchMap(auth => from(signOut(auth))),
        mapTo(null)
    );
  }
}

