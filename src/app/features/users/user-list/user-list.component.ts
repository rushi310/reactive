
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../shared/service/api.service';
import { Iuser } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: Iuser[] = [];
  private refreshSub!: Subscription;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.refreshSub = this.apiService.usersChanged$.subscribe(() => this.getAllUsers());
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  getAllUsers(): void {
    this.apiService.getAllUsers().subscribe({
      next: (res: any) => {
        this.users = res
          ? Object.keys(res).map(key => ({
            ...res[key],
            id: key
          }))
          : [];


        if (!this.route.firstChild && this.users.length) {
          this.router.navigate(['/users', this.users[0].id]);
        }
      },
      error: (err) => console.log(err)
    });
  }

  onAddUser(): void {
    this.router.navigate(['/users/add']);
  }

}
