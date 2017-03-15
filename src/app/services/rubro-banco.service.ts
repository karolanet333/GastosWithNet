import { ConfigService } from './../config/config.service';
import { Injectable } from '@angular/core';
import { Http, Request, Response } from "@angular/http";
import {RubroBanco} from '../model/rubro-banco';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class RubroBancoService {

  private urlGet: string = "rubrosbanco";

  constructor(private http: Http, private config: ConfigService) { 
  }

  getAll(): Observable<Array<RubroBanco>>{
    return this.http.get(this.config.baseUrl + this.urlGet).map(r => r.json());
  }

  add(rubro: RubroBanco): Observable<RubroBanco>{
    return this.http.post(this.config.baseUrl + this.urlGet, rubro)
      .map(r => {
        debugger;
        return r.json()
      })
      .catch(e => {
        debugger;
        return e.json();
      });
  }
}
