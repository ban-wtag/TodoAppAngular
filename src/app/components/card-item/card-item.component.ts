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
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');

  handleTaskButtonClick({id, dataJob}: TaskEventData): void {
    const taskIndex = this.taskService.taskList.findIndex(task => task.id === id);

    if (taskIndex < 0 && dataJob !== this.utilityService.DELETE_TODO) {
      return;
    }

    this.taskService.taskList.splice(taskIndex, 1);
  }

}
