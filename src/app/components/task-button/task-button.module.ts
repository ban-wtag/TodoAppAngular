import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskButtonComponent } from 'src/app/components/task-button/task-button.component';
import {CreateButtonModule} from 'src/app/components/create-button/create-button.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TaskButtonComponent
  ],
  imports: [
    CommonModule,
    CreateButtonModule,
    FormsModule
  ],
  exports: [TaskButtonComponent],
})

export class TaskButtonModule {}
