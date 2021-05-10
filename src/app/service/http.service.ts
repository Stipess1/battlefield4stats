import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../model/profile';
import { SearchProfile } from '../model/searchProfile';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "";
  public rawJson: any;
  public nickname: string = '';
  public profiles: SearchProfile[] = [];

  constructor(private http: HttpClient) {
    if(environment.production) {
      this.url = "http://api.youplayandroid.com/api";
    } else {
      this.url = "http://localhost:4200/api"
    }

   }


  public searchQuery(nickname: string) {
    // return this.http.get("http://localhost:4200/api/warsawoverviewpopulate/889021603/1")
    let formData = new FormData();
    formData.append("query", nickname);
    return this.http.post(this.url+"/search/query/", formData);
    // return this.http.get(this.url+"/query", {
    //   params: {
    //     query: nickname
    //   },
    //   responseType: 'json'

    // });
  }

  public getDetails(id: any) {
    return this.http.get(this.url+"/warsawoverviewpopulate/"+id+"/1", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getDetailedStats(id: any) {
    return this.http.get(this.url+"/warsawdetailedstatspopulate/"+id+"/1", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getAwards(id: any) {
    return this.http.get(this.url+"/warsawawardspopulate/"+id+"/1", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getWeapons(id: any) {
    return this.http.get(this.url+"/warsawWeaponsPopulateStats/"+id+"/đa  1/stats", {
      params: {
        id: id
      },
      responseType: 'json'
    });
  }

  public getServerInfo(guid: string) {
    return this.http.get(this.url+"/serverinfo", {
      params: {
        guid: guid
      },
      responseType: 'json'
    });
  }

  // query input 
  public query() {
    
  }
}
