import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TosComponent } from './tos/tos.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FooterComponent } from './footer/footer.component';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { AdsenseModule } from 'ng2-adsense';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    TosComponent,
    PrivacyPolicyComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxGoogleAnalyticsModule.forRoot('G-BW5C0QK9BT'),
    // NgxGoogleAnalyticsRouterModule.forRoot({include: [ /^\/public\/.*/ ]}),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8163593086331416',
      adSlot: 3318057938
    }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
