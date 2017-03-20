import { ConfigService } from './../config/config.service';
import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptions, RequestMethod } from "@angular/http";
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

  getById(Id: number) : Observable<RubroBanco>{
    var item$ = this.http.get(this.config.baseUrl + this.urlGet + "/" + Id).map(r => 
    {
      return r.json()
    });
    return item$;
  }

  edit(item: RubroBanco){

    //let headers = new Headers({ 'Content-Type': 'application/json' });

    //headers['keys'] = "";

    var requestOptions = {
      url: this.config.baseUrl + this.urlGet,
      method: RequestMethod.Put
    }

    return this.http.put(this.config.baseUrl + this.urlGet, item, requestOptions)
    .catch(error => { 
      return Observable.throw(error.json().error || 'Server error')
    });
  }

  delete(Id: number){

    var requestOptions = {
      url: this.config.baseUrl + this.urlGet + "/" + Id,
      method: RequestMethod.Delete,
      body: {Id: Id}
    }

    return this.http.delete(this.config.baseUrl + this.urlGet, requestOptions)
    /*.catch(error => { 
      return Observable.throw(error.json().error || 'Server error')
    });*/
  }
}
