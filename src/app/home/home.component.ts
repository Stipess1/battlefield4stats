import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchProfile } from '../model/searchProfile';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  close = faTimes;
  public bgPc: string = "";
  public bgXbox: string = "";
  public bgPs: string = "";
  public showClose: boolean = false;
  public days: number = 7;

  constructor(public service: HttpService, private router: Router,
    private route: ActivatedRoute,
    public modal: NgbModal
    ) { }

  ngOnInit(): void {
    this.service.inHome = true;
   
    // this.service.playerCount().subscribe((data: any) => {
    //   console.log(data);
      
    // });

    // this.service.playerCountDays(this.days).subscribe((data: any) => {

    // });

  }

  public nickname: string = "";
  public profiles: SearchProfile[] = [];

  public submit() {

    if(this.nickname.length > 0) {
      this.service.query(this.nickname);
    } 

  }

  public openDonateModal(content: any) {
    this.modal.open(content, {centered: true});
  }

  public player(player: SearchProfile) {
    this.service.inHome = false;
    this.service.profiles = [];
    this.service.loaded = false;
    this.router.navigate(["/details", player.id, player.nickname], {relativeTo: this.route});
  }

  public nickInput(nickname: string) {
    this.nickname = nickname;
  }

}
