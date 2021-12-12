import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '@app/shared/shared.module';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
