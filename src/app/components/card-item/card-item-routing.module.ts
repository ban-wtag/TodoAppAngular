import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskButtonModule } from 'src/app/components/task-button/task-button.module';

const routes: Routes = [
    { path: 'taskButton', loadChildren: () => import('src/app/components/task-button/task-button.module').then(m => m.TaskButtonModule) }
    // {path: 'taskButton', loadChildren: 'src/app/components/task-button/task-button.module#TaskButtonModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class CardItemRoutingModule {
}
