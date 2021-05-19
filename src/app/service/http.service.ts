import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Profile } from '../model/profile';
import { SearchProfile } from '../model/searchProfile';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "";
  public nickname: string = '';
  public profiles: SearchProfile[] = [];
  public loaded: boolean = false;
  public inHome: boolean = true;
  public loading: boolean = false;
  public loadedProfiles = false;
  public httpcall: any = null;

  constructor(private http: HttpClient, private router: Router,
    private route: ActivatedRoute) {
    if(environment.production) {
      this.url = "http://api.youplayandroid.com/api";
    } else {
      this.url = "http://localhost:4200/api"
    }

   }


  public searchQuery(nickname: string) {
    if(!environment.production) {
      let formData = new FormData();
      formData.append("query", nickname);
      return this.http.post(this.url+"/search/query/", formData);
    } else {
      return this.http.get(this.url+"/query", {
        params: {
          query: nickname
        },
        responseType: 'json'

      });
    }
  }

  public getDetails(id: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawoverviewpopulate/"+id+"/1", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/details", {
        params: {
          id: id
        },
        responseType: 'json'
      }); 
    }
    
  }

  public getDetailedStats(id: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawdetailedstatspopulate/"+id+"/1", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/detailedstats", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    }
  }

  public getAwards(id: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawawardspopulate/"+id+"/1", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/detailaward", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    }
  }

  public getWeapons(id: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawWeaponsPopulateStats/"+id+"/1/stats", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/weapons", {
        params: {
          id: id
        },
        responseType: 'json'
      });
    }
  }

  public getServerInfo(guid: string) {
    if(!environment.production) {
      return this.http.get(this.url+"/serverinfo", {
        params: {
          guid: guid
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/serverinfo", {
        params: {
          guid: guid
        },
        responseType: 'json'
      });
    }
  }

  // public playerCount() {
  //   return this.http.get('https://api.gametools.network/bf4/status/');
  // }

  // public playerCountDays(days: number) {
  //   return this.http.get('https://api.gametools.network/bf4/statusarray/?days='+days+'&region=ALL');
  // }

  // query input 
  

  public query(nickname: string) {
    this.profiles = [];
    this.loading = true;
    this.loadedProfiles = false;
    
    if(this.httpcall != null) {
      this.httpcall.unsubscribe();
    }

    this.httpcall = this.searchQuery(nickname).subscribe((data: any) => { 
      
      this.loading = false;

      if(data['data'].length == 1) {
        this.inHome = false;
        this.profiles = [];
        this.loaded = false;
        this.router.navigate(["/details", data['data'][0]['personaId'], data['data'][0]['user']['username']], {relativeTo: this.route});
      } else {
        
        for (let i = 0; i < data['data'].length; i++) {
          let profile = new SearchProfile();
          profile.id = data['data'][i]['personaId'];
          profile.nickname = data['data'][i]['personaName'];
          profile.gravatar = data['data'][i]['user']['gravatarMd5'];
          // for(let j = 0; j < data['data'][i]['games']) {
          //   profile.games.set()
          // }
          console.log(data['data'][i]['games']);
          
          this.profiles.push(profile);
        }

        this.loaded = true;
      }

    });
  }
}
