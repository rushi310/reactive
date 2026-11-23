import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Role } from '../models/role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowed = route.data['roles'] as Role[] | undefined;

    if (!allowed || this.authService.hasRole(allowed)) {
      return true;
    }

    alert('You do not have permission to access this page.');
    return this.router.createUrlTree(['/users']);
  }
}
