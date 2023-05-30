import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from 'src/app/components/card-item/card-item.component';
import { TaskButtonModule } from 'src/app/components/task-button/task-button.module';
import {AddCardModule} from 'src/app/components/add-card/add-card.module';

@NgModule({
  declarations: [
    CardItemComponent
  ],
  imports: [
    CommonModule,
    TaskButtonModule,
    AddCardModule
  ],
  exports: [CardItemComponent],
})
export class CardItemModule {}
