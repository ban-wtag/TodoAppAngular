import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
})
export class CreateButtonComponent {
  @Output() clickEvent = new EventEmitter();

  onClick() {
    this.clickEvent.emit();
  }
}
