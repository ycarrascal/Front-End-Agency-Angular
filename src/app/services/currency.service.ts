import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { apiConfig } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getJurneyCurrencyConvert(journey:any):Observable<any> {
        
    return this.http.post<any>(`${apiConfig.baseUrl+apiConfig.resources.journeyCurrencyConvert}`,journey); 

  }
}
