import { Component, OnInit } from '@angular/core';
import { faAd, faDonate, faEnvelope, faHandshake, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../service/http.service';

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

  public adText: string = "";
  constructor(public modal: NgbModal, public service: HttpService) { }

  ngOnInit(): void {
    if(localStorage.getItem('ads') != undefined && localStorage.getItem('ads')?.includes('true')) {
      this.service.ads = true;
      this.adText = "Disable ads";
    }  else if(localStorage.getItem('ads') != undefined && localStorage.getItem('ads')?.includes('false')) {
      this.service.ads = false;
      this.adText = "Enable ads";
    } else {
      localStorage.setItem('ads', 'false');
      this.service.ads = false;
      this.adText = "Enable ads";
    }
  }

  public openDonateModal(content: any) {
    this.modal.open(content, {centered: true, size: 'lg', modalDialogClass: 'custom-body'});
  }

  public toggleAds() {

    if(localStorage.getItem('ads') == undefined || localStorage.getItem('ads')?.includes("false")) {
      localStorage.setItem('ads', 'true')
      this.adText = "Disable ads";
      this.service.ads = true;
    } else if (localStorage.getItem('ads')?.includes("true")){
      localStorage.setItem('ads', 'false');
      this.adText = "Enable ads";
      this.service.ads = false;
    }
  }

}
