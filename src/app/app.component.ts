import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'
import { User } from './core/models/user.model';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'star-wars-characters-rating';
  currentUser$!: Observable<User | null>;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
    this.authService.initializeAuth();

    this.currentUser$ = this.authService.getCurrentUser();
  }

  onLogout() {
    this.authService.logout().subscribe();
  }
}
