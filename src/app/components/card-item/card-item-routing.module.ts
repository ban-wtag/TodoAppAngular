import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'taskButton', loadChildren: () => import('src/app/components/task-button/task-button.module').then(m => m.TaskButtonModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class CardItemRoutingModule {
}
