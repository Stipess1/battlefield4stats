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
  public ads: boolean = false;

  constructor(private http: HttpClient, private router: Router,
    private route: ActivatedRoute) {
    
    if(environment.production) {
      this.url = "https://bf4stats.herokuapp.com";
    } else {
      this.url = "http://localhost:4200/api";
    }
    
   }


  public searchQuery(nickname: string) {
    if(!environment.production) {
      let formData = new FormData();
      formData.append("query", nickname);
      return this.http.post(this.url+"/search/query/", formData);
    } else {
      return this.http.get(this.url+"/query/"+nickname);
    }
  }

  public getDetails(id: any, platform: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawoverviewpopulate/"+id+"/"+platform, {
        params: {
          id: id,
          platform: platform
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/details/"+id+"/"+platform); 
    }
    
  }

  public getDetailedStats(id: any, platform: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawdetailedstatspopulate/"+id+"/"+platform, {
        params: {
          id: id,
          platform: platform
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/detailedstats/"+id+"/"+platform);
    }
  }

  public getAwards(id: any, platform: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawawardspopulate/"+id+"/"+platform, {
        params: {
          id: id,
          platform: platform
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/detailaward/"+id+"/"+platform)
    }
  }

  public getWeapons(id: any, platform: any) {
    if(!environment.production) {
      return this.http.get(this.url+"/warsawWeaponsPopulateStats/"+id+"/"+platform+"/stats", {
        params: {
          id: id,
          platform: platform
        },
        responseType: 'json'
      });
    } else {
      return this.http.get(this.url+"/weapons/"+id+"/"+platform);
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
      return this.http.get(this.url+"/serverinfo/"+guid);
    }
  }

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

        let profile;
        for (let i = 0; i < data['data'].length; i++) {
          let da = data['data'][i];
          profile = new SearchProfile();
          if(da['games']['1'] != undefined && da['games']['1'] != "0") {
            profile.platformImg = "../../assets/icons/pc.png";
            profile.platform = "1";
          } else if(da['games']['2'] != undefined && da['games']['2'] != "0" ) {
            profile.platformImg = "../../assets/icons/xbox360.png";
            profile.platform = "2";
          } else if(da['games']['4'] != undefined && da['games']['4'] != "0") {
            profile.platformImg = "../../assets/icons/ps3.png";
            profile.platform = "4";
          } else if(da['games']['32'] != undefined && da['games']['32'] != "0" ) {
            profile.platformImg = "../../assets/icons/ps4.png";
            profile.platform = "32";
          } else if(da['games']['64'] != undefined && da['games']['64'] != "0") {
            profile.platformImg = "../../assets/icons/xboxone.png";
            profile.platform = "64";
          }
        }

        this.inHome = false;
        this.profiles = [];
        this.loaded = false;
        this.router.navigate(["/details", data['data'][0]['personaId'], data['data'][0]['user']['username'], profile?.platform], {relativeTo: this.route});
      } else {
        
        for (let i = 0; i < data['data'].length; i++) {
          let profile = new SearchProfile();
          let da = data['data'][i];
          profile.id = da['personaId'];
          profile.nickname = da['personaName'];
          profile.gravatar = da['user']['gravatarMd5'];
          if(da['games']['1'] != undefined && da['games']['1'] != "0") {
            profile.platformImg = "../../assets/icons/pc.png";
            profile.platform = "1";
          } else if(da['games']['2'] != undefined && da['games']['2'] != "0" ) {
            profile.platformImg = "../../assets/icons/xbox360.png";
            profile.platform = "2";
          } else if(da['games']['4'] != undefined && da['games']['4'] != "0") {
            profile.platformImg = "../../assets/icons/ps3.png";
            profile.platform = "4";
          } else if(da['games']['32'] != undefined && da['games']['32'] != "0" ) {
            profile.platformImg = "../../assets/icons/ps4.png";
            profile.platform = "32";
          } else if(da['games']['64'] != undefined && da['games']['64'] != "0") {
            profile.platformImg = "../../assets/icons/xboxone.png";
            profile.platform = "64";
          }
          
          this.profiles.push(profile);
        }

        this.loadedProfiles = true;
        this.loaded = true;
      }

    });
  }
}
