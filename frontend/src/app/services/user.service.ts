import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError, Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  list(): Observable<any> {
    return this.http.get(`${environment.baseApi}/user`).pipe(
      map((res: any) => res),
      catchError(error => throwError(error || 'Server Error')),);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${environment.baseApi}/user`, data).pipe(
      map((res: any) => res),
      catchError(error => {
        return throwError(error || 'Server Error');
      }),);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${environment.baseApi}/user/${id}`, data).pipe(
      map((res: any) => res),
      catchError(error => {
        return throwError(error || 'Server Error');
      }),);
  }

  find(id: any): Observable<any> {
    return this.http.get(`${environment.baseApi}/user/${id}`).pipe(
      map((res: any) => res),
      catchError(error => throwError(error || 'Server Error')),);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.baseApi}/user/${id}`).pipe(
      map((res: any) => res),
      catchError(error => throwError(error)),);
  }
}
