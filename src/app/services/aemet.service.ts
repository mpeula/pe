import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AemetService {
  url = 'http://localhost:3000/api';

  constructor(
    private http: Http
  ) { }

  get(path) : Observable<any> {   
    return this.http.get(`${this.url}${path}`)
      .map(response => {
        let body = response.json();
        return body || { };
      });
  }

}
