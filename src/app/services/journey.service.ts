import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(private http: HttpClient) {

   }

   getJurney(journey:any):Observable<any> {
        
      return this.http.post<any>(`${apiConfig.baseUrl+apiConfig.resources.journey}`,journey); 
  }
  
}