import { Injectable } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task.model';

@Injectable({
  providedIn: 'root',
})

export class UtilityService {
  constantsService: ConstantsService;
  taskService: TaskService;
  constructor(constantsService: ConstantsService, taskService: TaskService){
    this.constantsService = constantsService;
    this.taskService = taskService;
  }
  show = false;
  TODAY: Date = new Date();
  endDate!: number;

  calculateDuration(startDate: number): number{
    this.endDate = Date.now();
    return Math.floor(Math.abs((this.endDate - startDate)/this.constantsService.MS_PER_DAY) + 1);
  }

  toggleTaskProperties(taskIndex: number, ...propertyNames: string[]){
    const targetTask = this.taskService.taskList[taskIndex];
    propertyNames.forEach((propertyName) => {
      targetTask[propertyName] = !targetTask[propertyName];
    });
  }
}
