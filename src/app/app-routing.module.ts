
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';

import { UserFormComponent } from './features/users/user-form/user-form.component';
import { UserDashboardComponent } from './features/users/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';

import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';

import { AuthGuard } from './shared/guards/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { RoleGuard } from './shared/guards/role.guard';
import { CAN_EDIT, CAN_VIEW } from './shared/models/role.model';

const routes: Routes = [


  {
    path: 'login',
    component: LoginComponent
  },
  {
  path: 'signup',
  component: SignupComponent
},

  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },


  {
    path: 'users',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: CAN_VIEW },
    children: [
      {
        path: 'add',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { roles: CAN_EDIT }
      },
      {
        path: 'edit/:id',
        component: UserFormComponent,
        canActivate: [RoleGuard],
        data: { roles: CAN_EDIT }
      },
      {
        path: '',
        component: UserDashboardComponent,
        children: [
          {
            path: ':id',
            component: UserDetailsComponent
          }
        ]
      }
    ]
  },


  {
    path: 'products',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: CAN_VIEW },
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'add',
        component: ProductFormComponent,
        canActivate: [RoleGuard],
        data: { roles: CAN_EDIT }
      },
      {
        path: 'edit/:id',
        component: ProductFormComponent,
        canActivate: [RoleGuard],
        data: { roles: CAN_EDIT }
      }
    ]
  },

  // Wildcard Route
  {
    path: '**',
    redirectTo: 'users'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
