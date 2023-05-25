import { Component } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  utilityService: UtilityService;
  APP_TITLE="Add Tasks";
  timeoutId: any;
  
  constructor(utilityService: UtilityService) { 
    this.utilityService = utilityService;
  }
  
  onShowInput() {
    this.utilityService.show = true;
  }
}
