import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

// preferred
export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => {
      const isAuth = !!user;

      if (isAuth) {
        return true;
      } else {
        return router.createUrlTree(['/auth']);
      }
    })
    // tap((isAuth) => {
    //   if (!isAuth) {
    //     this.router.navigate(['/auth']);
    //   }
    // })
  );
};

// deprecated
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private authSevice: AuthService, private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     return this.authSevice.user.pipe(
//       take(1),
//       map((user) => {
//         const isAuth = !!user;

//         if (isAuth) {
//           return true;
//         } else {
//           return this.router.createUrlTree(['/auth']);
//         }
//       })
//       // tap((isAuth) => {
//       //   if (!isAuth) {
//       //     this.router.navigate(['/auth']);
//       //   }
//       // })
//     );
//   }
// }
