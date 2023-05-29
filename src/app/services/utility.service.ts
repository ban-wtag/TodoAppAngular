import { Injectable } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { NewTaskInputDirective } from 'src/app/directives/new-task-input.directive';

@Injectable({
  providedIn: 'root',
})

export class UtilityService {
  show = false;
  APP_TITLE = 'Add Tasks';
  TODAY: Date = new Date();
  endDate!: number;
  COMPLETE = 'complete';
  EDIT = 'edit';
  DELETE_TODO = 'delete';
  REVERT = 'revert';
  SAVE = 'save';
  COMPLETE_AFTER_EDIT = 'completeAfterEdit';
  MS_PER_DAY = 86400000;
  timeoutId!: ReturnType<typeof setTimeout> 

  taskService: TaskService;
  constructor(taskService: TaskService){
    this.taskService = taskService;
  }
 
  calculateDuration(startDate: number): number{
    this.endDate = Date.now();
    return Math.floor(Math.abs((this.endDate - startDate)/this.MS_PER_DAY) + 1);
  }

  toggleTaskProperties(taskIndex: number, ...propertyNames: string[]){
    const targetTask = this.taskService.taskList[taskIndex];
    propertyNames.forEach((propertyName) => {
      targetTask[propertyName] = !targetTask[propertyName];
    });
  }
  
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
