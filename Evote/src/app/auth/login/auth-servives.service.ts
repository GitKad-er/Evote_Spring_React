import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl, BASE_URL_LOG } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServivesService {
  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`${BASE_URL_LOG}/auth/signin`,data);
  }
}
