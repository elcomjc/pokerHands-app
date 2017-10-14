import { DealerService } from './dealer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PokerTableComponent } from './poker-table/poker-table.component';
import { HandComponent } from './hand/hand.component';
import { CardComponent } from './card/card.component';
import { DealerComponent } from './dealer/dealer.component';

@NgModule({
  declarations: [
    AppComponent,
    PokerTableComponent,
    HandComponent,
    CardComponent,
    DealerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonsModule.forRoot()
  ],
  providers: [DealerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
