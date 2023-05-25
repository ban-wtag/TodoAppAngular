import { Component, Input,ViewChild } from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import { formatDate } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddCardComponent } from '../add-card/add-card.component';
import { TaskEventData } from 'src/app/models/TaskEventData';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})

export class CardItemComponent {
  taskService: TaskService;
  utilityService: UtilityService;

  constructor(taskService: TaskService, utilityService: UtilityService){
    this.taskService = taskService;
    this.utilityService = utilityService;
  }
  @ViewChild(AddCardComponent) comp!: AddCardComponent;
  @Input() taskLists: Task[] = [];

  task: Task = new Task();
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  endDate!: number;

  onCompleteTask(taskIndex: number){
    this.taskService.taskList[taskIndex].done = true;
    this.taskService.taskList[taskIndex].showCompleteButton = false;
    this.taskService.taskList[taskIndex].showEditButton = false;  
  }

  calculateDuration(startDate: number): number{
    this.endDate = Date.now();
    return Math.floor(Math.abs((this.endDate - startDate)/this.utilityService.MS_PER_DAY) + 1);
  }


  handleTaskButtonClick({id, dataJob}: TaskEventData): void {
    const taskIndex = this.taskService.taskList.findIndex(task => task.id === id);

    switch (dataJob) {
      case this.utilityService.COMPLETE:
        if (taskIndex >= 0) {
          this.onCompleteTask(taskIndex);
        }
        break;
  
      case this.utilityService.DELETE_TODO:
        if (taskIndex >= 0) {
          this.taskService.taskList.splice(taskIndex, 1);
        }
        break;
    }
  }
}