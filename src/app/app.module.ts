import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { NewTaskInputDirective } from './directives/new-task-input.directive';
import { TaskButtonComponent } from './components/task-button/task-button.component';

import { ConstantsService } from 'src/app/services/constants.service';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateButtonComponent,
    AddCardComponent,
    NewTaskInputDirective,
    TaskButtonComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [ConstantsService, TaskService, UtilityService],
  bootstrap: [AppComponent],
})

export class AppModule {}
