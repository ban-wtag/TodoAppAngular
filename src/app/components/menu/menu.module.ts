import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CreateButtonModule } from 'src/app/components/create-button/create-button.module';
import {AddCardModule} from 'src/app/components/add-card/add-card.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, CreateButtonModule, AddCardModule],
  providers: [],
  exports: [MenuComponent],
})
export class MenuModule {}