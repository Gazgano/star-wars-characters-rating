import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordFormControl = new FormControl('', Validators.required);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      this.isLoading$.next(true);
      this.authService.createNewUser(this.emailFormControl.value, this.passwordFormControl.value).pipe(
        finalize(() => this.isLoading$.next(false))
      ).subscribe()
    }
  }
}
