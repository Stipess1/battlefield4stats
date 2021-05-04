import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "http://localhost:3000";
  public rawJson: any;
  public nickname: string = '';

  constructor(private http: HttpClient) { }


  public searchQuery(nickname: string) {
    return this.http.get(this.url+"/query/"+nickname)
  }

  public getDetails(id: any) {
    return this.http.get(this.url+"/details/"+id);
  }

  public getDetailedStats(id: any) {
    return this.http.get(this.url+"/detailedstats/"+id);
  }

  public getAwards(id: any) {
    return this.http.get(this.url+"/detailaward/"+id);
  }
}
