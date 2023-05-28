import { Component, Input,ViewChild } from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import { formatDate } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskEventData } from 'src/app/models/TaskEventData';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})

export class CardItemComponent {

  constructor(private taskService: TaskService, private utilityService: UtilityService){}
  
  @Input() taskLists: Task[] = [];
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  taskList = this.taskService.gettaskList();
  utility = this.utilityService;

  handleTaskButtonClick({index, dataJob}: TaskEventData): void {
    const taskIndex = this.taskService.taskList.findIndex(task => task.id === index);
    if (dataJob !== this.utilityService.DELETE_TODO) {
      return;
    }
    this.taskService.taskList.splice(taskIndex, 1);
  } 
}
