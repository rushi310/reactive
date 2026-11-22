import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './features/users/user-list/user-list.component';
import { UserFormComponent } from './features/users/user-form/user-form.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { ProductFormComponent } from './features/products/product-form/product-form.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ManagerComponent } from './pages/manager/manager.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { UserDashboardComponent } from './features/users/user-dashboard/user-dashboard.component';
import { UserDetailsComponent } from './features/users/user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserFormComponent,
    UserListComponent,
    ProductListComponent,
    ProductFormComponent,
    AdminComponent,
    ManagerComponent,
    DashboardComponent,
    UserDashboardComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
