import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { UserDashboardComponent } from './features/users/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'users',
    pathMatch:'full'
  },

  //user Routes (add/edit must come before the dashboard so "add" is not treated as an :id)
  {
    path:'users/add',
    component:UserFormComponent
  },
  {
    path:'users/edit/:id',
    component:UserFormComponent
  },
  {
    path:'users',
    component:UserDashboardComponent,
    children:[
      {
        path:':id',
        component:UserDetailsComponent
      }
    ]
  },

  //Product Routes
  {
    path:'products',
    component:ProductListComponent
  },
  {
    path:'products/add',
    component:ProductFormComponent
  },
  {
    path:'products/edit/:id',
    component:ProductFormComponent
  },

  //wildcard Route
  {
    path:'**',
    redirectTo:'users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
