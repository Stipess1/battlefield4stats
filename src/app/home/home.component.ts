import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private service: HttpService, private router: Router,
    private route: ActivatedRoute,
    // private dialog: MatDialog
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
   
  }

  public nickname: string = "";

  public submit() {
    console.log(this.nickname);
    if(this.nickname.length > 0) {
      this.service.searchQuery(this.nickname).subscribe((data: any) => {
        console.log(data);
        this.service.rawJson = data;
        console.log(data['data'].length);

        if(data['data'].length == 1) {
          this.router.navigate(["/details", data['data'][0]['personaId'], data['data'][0]['user']['username']], {relativeTo: this.route});
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

    // mozda treba napravit component sve tamo redirect i onda od tamo na dalje

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
