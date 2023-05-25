import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateButtonComponent } from 'src/app/components/create-button/create-button.component';

@NgModule({
  declarations: [
    CreateButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CreateButtonComponent],
})

export class CreateButtonModule {}
