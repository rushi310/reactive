import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ROLES } from '../../models/role.model';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get roleLabel(): string {
    const role = this.authService.getRole();
    return ROLES.find(r => r.value === role)?.label || '';
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
