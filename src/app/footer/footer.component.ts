import { Component, OnInit } from '@angular/core';
import { faAd, faDonate, faEnvelope, faHandshake, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  donate = faDonate;
  privacy = faUserShield;
  mail = faEnvelope;
  tos = faHandshake;
  ads = faAd;

  public ad: boolean = false;
  public adText: string = "";
  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
    if(localStorage.getItem('ads') != undefined && localStorage.getItem('ads')?.includes('true')) {
      this.ad = true;
      this.adText = "Disable ads";
    }  else if(localStorage.getItem('ads') != undefined && localStorage.getItem('ads')?.includes('false')) {
      this.ad = false;
      this.adText = "Enable ads";
    } else {
      localStorage.setItem('ads', 'false');
      this.ad = false;
      this.adText = "Enable ads";
    }
  }

  public openDonateModal(content: any) {
    this.modal.open(content, {centered: true, size: 'lg', modalDialogClass: 'custom-body'});
  }

  public toggleAds() {
   
    console.log("da");
    

    if(localStorage.getItem('ads') == undefined || localStorage.getItem('ads')?.includes("false")) {
      localStorage.setItem('ads', 'true')
      this.adText = "Disable ads";
      this.ad = true;
    } else if (localStorage.getItem('ads')?.includes("true")){
      localStorage.setItem('ads', 'false');
      this.adText = "Enable ads";
      this.ad = false;
    }
  }

}
