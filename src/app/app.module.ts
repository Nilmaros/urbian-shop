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
import { EditModalComponent } from './what-is/edit-modal/edit-modal.component';
import { NewModalComponent } from './what-is/new-modal/new-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartModule } from 'ng-shopping-cart';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    WhatIsComponent,
    GameComponent,
    TiendaComponent,
    EditModalComponent,
    NewModalComponent,
    ContactComponent
  ],
  imports: [
    ShoppingCartModule.forRoot({
      // itemType: MyCartItemClass,
      serviceType: 'localStorage',
      serviceOptions: {
        storageKey: 'NgShoppingCart',
        clearOnError: true
      }
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditModalComponent, NewModalComponent]
})
export class AppModule { }
