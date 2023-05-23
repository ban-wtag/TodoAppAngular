import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//featured Module
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import {AddCardModule} from 'src/app/components/add-card/add-card.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, NavbarModule, AddCardModule],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {}
