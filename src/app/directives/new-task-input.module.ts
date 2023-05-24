import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskInputDirective } from './new-task-input.directive';

@NgModule({
  declarations: [NewTaskInputDirective],
  imports: [CommonModule],
  exports: [NewTaskInputDirective],
})

export class NewTaskInputModule {}
