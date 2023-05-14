import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  show: boolean = false;
  constructor() {}
  toggleInput(): void {
    this.show = !this.show;
    console.log('show ', this.show);
  }
}
