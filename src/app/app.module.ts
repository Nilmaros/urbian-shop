import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { WhatIsComponent } from './what-is/what-is.component';
import { GameComponent } from './game/game.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ContactComponent } from './contact/contact.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleModalModule } from 'ngx-simple-modal';
import { EditModalComponent } from './edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    WhatIsComponent,
    GameComponent,
    TiendaComponent,
    EditModalComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    SimpleModalModule.forRoot({container: "modal-container"})
  ],
  entryComponents: [
    EditModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
