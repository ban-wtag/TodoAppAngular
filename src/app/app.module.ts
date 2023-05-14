import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // <-- import this module

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { DeleteCardComponent } from './components/delete-card/delete-card.component';

@NgModule({
  declarations: [AppComponent, CreateButtonComponent, AddCardComponent, DeleteCardComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
