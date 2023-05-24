import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//featured Module
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
// import {AddCardModule} from 'src/app/components/add-card/add-card.module';
import {MenuModule} from 'src/app/components/menu/menu.module';
//import { MenuComponent } from './components/menu/menu.component';
import {CardItemModule} from 'src/app/components/card-item/card-item.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NavbarModule, MenuModule, CardItemModule],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
