import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public isLoading = false;
  public passwordFormControl = new FormControl('', Validators.required);
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.isLoading = true;
    this.signIn(this.emailFormControl.value, this.passwordFormControl.value);
  }

  private signIn(email: string, password: string) {
    this.authService.signInWithEmailAndPassword(email, password).subscribe(() => this.router.navigateByUrl('/'))
  }
}
