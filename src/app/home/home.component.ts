import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchProfile } from '../model/searchProfile';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bgPc: string = "";
  public bgXbox: string = "";
  public bgPs: string = "";
  public loading: boolean = false;

  constructor(private service: HttpService, private router: Router,
    private route: ActivatedRoute,
    // private dialog: MatDialog
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
   console.log(this.profiles.length);
   
  }

  public nickname: string = "";
  public profiles: SearchProfile[] = [];

  public submit() {
    
    if(this.nickname.length > 0) {
      this.profiles = [];
      this.loading = true;
      this.service.searchQuery(this.nickname).subscribe((data: any) => { 
        this.service.rawJson = data;
        this.loading = false;

        if(data['data'].length == 1) {
          this.router.navigate(["/details", data['data'][0]['personaId'], data['data'][0]['user']['username']], {relativeTo: this.route});
        } else {
          
          for (let i = 0; i < data['data'].length; i++) {
            let profile = new SearchProfile();
            profile.id = data['data'][i]['personaId'];
            profile.nickname = data['data'][i]['personaName'];
            profile.gravatar = data['data'][i]['user']['gravatarMd5'];
            this.profiles.push(profile);
          }
        }

      });
    } else {
      this.snackBar.open("Enter nickname!","" ,{
        duration: 3000,
      });
      // let dialogRef = this.dialog.open(HomeComponent, {
      //   height: '400px',
      //   width: '600px',
      // });
    }


  }

  public player(player: SearchProfile) {
    console.log("click");
    
    this.router.navigate(["/details", player.id, player.nickname], {relativeTo: this.route});
  }

  public set(platform: string) {
    console.log(platform);
    
    if(platform === "origin") {
      this.bgPc = "#212933"
      this.bgXbox = "";
      this.bgPs = "";
    } else if(platform === "xbox") {
      this.bgPc = ""
      this.bgXbox = "#212933";
      this.bgPs = "";
    } else {
      this.bgPc = ""
      this.bgXbox = "";
      this.bgPs = "#212933";
    }
  }

  public details() {
    this.router.navigate(["/details"], {relativeTo: this.route});
  }

  public nickInput(nickname: string) {
    this.nickname = nickname;
  }

}
