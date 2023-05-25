import { Injectable } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Injectable({
  providedIn: 'root',
})

export class UtilityService {
  show = false;
  TODAY: Date = new Date();
  endDate!: number;
  COMPLETE = 'complete';
  EDIT = 'edit';
  DELETE_TODO = 'delete';
  REVERT = 'revert';
  SAVE = 'save';
  COMPLETE_AFTER_EDIT = 'completeAfterEdit';
  APP_TITLE = 'Add Tasks';
  MS_PER_DAY = 86400000;
  
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
}
