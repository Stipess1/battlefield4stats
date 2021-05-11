import { Component, OnInit } from '@angular/core';
import { faDonate, faEnvelope, faHandshake, faUserShield } from '@fortawesome/free-solid-svg-icons';
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
  constructor(public modal: NgbModal) { }

  ngOnInit(): void {
  }


  public openDonateModal(content: any) {
    this.modal.open(content, {centered: true});
  }

}
