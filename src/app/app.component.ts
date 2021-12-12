import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import { environment } from '../environments/environment'
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'star-wars-characters-rating';
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
    this.authService.initializeAuth();
  }
}
