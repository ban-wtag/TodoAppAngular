import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from 'src/app/components/menu/menu.component';
import { CreateButtonModule } from 'src/app/components/create-button/create-button.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, CreateButtonModule],
  providers: [],
  exports: [MenuComponent],
})
export class MenuModule {}
