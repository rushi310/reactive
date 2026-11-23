import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../../../shared/service/api.service';
import { Iuser } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/service/auth.service';
import { CAN_DELETE, CAN_EDIT } from '../../../shared/models/role.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userId!: string;
  user: Iuser | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  get canEdit(): boolean {
    return this.authService.hasRole(CAN_EDIT);
  }

  get canDelete(): boolean {
    return this.authService.hasRole(CAN_DELETE);
  }

  ngOnInit(): void {
    // params (not snapshot) because this component is reused when switching users
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.getUser();
    });
  }

  getUser(): void {
    this.user = null;
    this.apiService.getUserById(this.userId).subscribe({
      next: (res) => this.user = res,
      error: (err) => console.log(err)
    });
  }

  onEdit(): void {
    this.router.navigate(['/users/edit', this.userId]);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(this.userId).subscribe({
        next: () => {
          alert('User deleted successfully');
          this.router.navigate(['/users']);
          this.apiService.usersChanged$.next();
        },
        error: (err) => console.log(err)
      });
    }
  }

}
