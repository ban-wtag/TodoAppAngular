import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { CreateButtonComponent } from './components/create-button/create-button.component';
// import { AddCardComponent } from './components/add-card/add-card.component';
import { NewTaskInputDirective } from './directives/new-task-input.directive';
//import { TaskButtonComponent } from './components/task-button/task-button.component';
//import { CardItemComponent } from 'src/app/components/card-item/card-item.component';
import { ConstantsService } from 'src/app/services/constants.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';
//featured Module
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import {AddCardModule} from 'src/app/components/add-card/add-card.module';


@NgModule({
  declarations: [
    AppComponent
    // TaskButtonComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, NavbarModule, AddCardModule],
  providers: [ConstantsService, TaskService, UtilityService],
  bootstrap: [AppComponent],
})

export class AppModule {}
