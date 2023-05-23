import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskButtonComponent } from 'src/app/components/task-button/task-button.component';
import {CreateButtonModule} from 'src/app/components/create-button/create-button.module';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    { path: '', component: TaskButtonComponent }
];

@NgModule({
  declarations: [
    TaskButtonComponent
  ],
  imports: [
    CommonModule,
    CreateButtonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
//   exports: [TaskButtonComponent],
})

export class TaskButtonModule { 
  constructor(){
    console.log('TaskButtonModule loading');
  }
}
