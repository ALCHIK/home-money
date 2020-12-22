import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BaseApi {
  constructor(
    public http: Http
  ) {}

  private baseUrl = 'http://localhost:3000/';

  getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response: Response) => response.json());
  }

  post(url: string, data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }

  put(url: string = '', data: any = {}): Observable<any> {
    console.log(url)
    return this.http.put(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }
}
