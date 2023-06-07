import { Injectable } from '@angular/core';
import { NewTaskInputDirective } from 'src/app/directives/new-task-input.directive';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  show = false;
  COMPLETE = 'complete';
  DELETE_TODO = 'delete';
  EDIT = 'edit';
  RESET = 'reset';

  timeoutId!: ReturnType<typeof setTimeout> 
  setFocusWithTimeout(newTaskInputDirective: NewTaskInputDirective): void {
    this.timeoutId = setTimeout(() => {
      newTaskInputDirective.focus();
    }, 0);
  }

  clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
