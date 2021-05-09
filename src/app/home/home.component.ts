import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { faDonate, faEnvelope, faHandshake, faTimes, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchProfile } from '../model/searchProfile';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  donate = faDonate;
  privacy = faUserShield;
  mail = faEnvelope;
  tos = faHandshake;
  close = faTimes;
  public bgPc: string = "";
  public bgXbox: string = "";
  public bgPs: string = "";
  public loading: boolean = false;
  public loaded: boolean = false;
  public showClose: boolean = false;

  constructor(private service: HttpService, private router: Router,
    private route: ActivatedRoute,
    // private dialog: MatDialog
    private snackBar: MatSnackBar,
    public modal: NgbModal
    ) { }

  ngOnInit(): void {
  
   
  }

  public nickname: string = "";
  public profiles: SearchProfile[] = [];

  public submit() {

    if(this.nickname.length > 0) {
      this.profiles = [];
      this.loading = true;
      this.loaded = false;
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

          this.loaded = true;
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

  public openDonateModal(content: any) {
    this.modal.open(content, {centered: true});
  }

  public player(player: SearchProfile) {
    console.log("click");
    
    this.router.navigate(["/details", player.id, player.nickname], {relativeTo: this.route});
  }


  public details() {
    this.router.navigate(["/details"], {relativeTo: this.route});
  }

  public nickInput(nickname: string) {
    this.nickname = nickname;
  }

}
