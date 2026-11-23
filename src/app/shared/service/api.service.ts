
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iuser } from '../models/user.model';
import { Iproduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = environment.BASE_URL;


  usersChanged$ = new Subject<void>();

  constructor(private http: HttpClient) {}



  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseURL}/users.json`);
  }

  getUserById(id: string): Observable<Iuser> {
    return this.http.get<Iuser>(`${this.baseURL}/users/${id}.json`);
  }

  addUser(user: Iuser): Observable<any> {
    return this.http.post(`${this.baseURL}/users.json`, user);
  }

  updateUser(id: string, user: Partial<Iuser>): Observable<any> {
    return this.http.patch(`${this.baseURL}/users/${id}.json`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/users/${id}.json`);
  }

  activateUser(id:string):Observable<any>{
    return this.http.patch(`${this.baseURL}/users/${id}.json`,
      {status:true}
    );
  }
  deactivateUser(id:string):Observable<any>{
    return this.http.patch(`${this.baseURL}/users/${id}.json`,
      {status:false}
    );
  }

  // Products

  getAllProduct(): Observable<any> {
    return this.http.get(`${this.baseURL}/products.json`);
  }

  getProductById(id: string): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.baseURL}/products/${id}.json`);
  }

  addProduct(product: Iproduct): Observable<any> {
    return this.http.post(`${this.baseURL}/products.json`, product);
  }

  updateProduct(id: string, product: Partial<Iproduct>): Observable<any> {
    return this.http.patch(`${this.baseURL}/products/${id}.json`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/products/${id}.json`);
  }

}
