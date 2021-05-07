import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "http://localhost/bfstats-server";
  public rawJson: any;
  public nickname: string = '';

  constructor(private http: HttpClient) { }


  public searchQuery(nickname: string) {
    return this.http.get(this.url+"/query", {
      params: {
        query: nickname
      },
      responseType: 'json'

    });
  }

  public getDetails(id: any) {
    return this.http.get(this.url+"/details", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getDetailedStats(id: any) {
    return this.http.get(this.url+"/detailedstats", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getAwards(id: any) {
    return this.http.get(this.url+"/detailaward", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getWeapons(id: any) {
    return this.http.get(this.url+"/weapons", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }
}
