import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private loggerService: LoggerService,
  ) {}

  canLoad() {
    return this.authService.getCurrentUser().pipe(
      take(1),
      map(currentUser => !!currentUser),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.loggerService.info('Not logged in. Access denied.');
          this.router.navigateByUrl('login');
        }
      }),
    );
  }
}
