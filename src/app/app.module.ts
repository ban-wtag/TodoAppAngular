import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NewTaskInputDirective } from './directives/new-task-input.directive';

@NgModule({
  declarations: [AppComponent, CreateButtonComponent, AddCardComponent, NewTaskInputDirective],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
