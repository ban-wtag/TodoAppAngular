import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from 'src/app/components/card-item/card-item.component';
import { TaskButtonModule } from 'src/app/components/task-button/task-button.module';
import { CardItemRoutingModule } from 'src/app/components/card-item/card-item-routing.module';

@NgModule({
  declarations: [
    CardItemComponent
  ],
  imports: [
    CommonModule,
    TaskButtonModule,
    CardItemRoutingModule
  ],
  providers: [],
  exports: [CardItemComponent],
})

export class CardItemModule { 
  constructor(){
    console.log('CardItemModule loading');
  }
}
