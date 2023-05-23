import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardComponent } from 'src/app/components/add-card/add-card.component';
import {CardItemModule} from 'src/app/components/card-item/card-item.module';
import {CreateButtonModule} from 'src/app/components/create-button/create-button.module';
import {FormsModule} from '@angular/forms';
import { NewTaskInputDirective } from 'src/app/directives/new-task-input.directive';

@NgModule({
  declarations: [
    AddCardComponent,
    NewTaskInputDirective
  ],
  imports: [
    CommonModule,
    CardItemModule,
    CreateButtonModule,
    FormsModule
  ],
  exports: [AddCardComponent],
})

export class AddCardModule { 
  constructor(){
    console.log('AddCardModule loading');
  }
}
