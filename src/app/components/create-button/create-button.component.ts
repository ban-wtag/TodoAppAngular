import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css'],
})

export class CreateButtonComponent {
  @Output() createButtonClick = new EventEmitter();

  onClick() {
    this.createButtonClick.emit();
  }
}
