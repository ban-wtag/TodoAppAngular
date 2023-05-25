import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddCardComponent } from 'src/app/components/add-card/add-card.component';
import { CreateButtonModule } from 'src/app/components/create-button/create-button.module';
import { NewTaskInputModule } from 'src/app/directives/new-task-input.module'

@NgModule({
  declarations: [
    AddCardComponent
  ],
  imports: [
    CommonModule,
    CreateButtonModule,
    FormsModule,
    NewTaskInputModule
  ],
  exports: [AddCardComponent],
})

export class AddCardModule {}
