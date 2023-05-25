import { Component, Input, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { Button } from 'src/app/models/Button.model';

@Component({
  selector: 'app-task-button',
  templateUrl: './task-button.component.html',
  styleUrls: ['./task-button.component.css'],
})

export class TaskButtonComponent implements OnInit {
 @Input()id  = 0;

 utilityService: UtilityService;
 taskService: TaskService
  constructor(
    utilityService: UtilityService,
    taskService: TaskService
  ) {
    this.utilityService = utilityService,
    this.taskService = taskService
  }

  ngOnInit(): void {
    this.addNewTaskButton();
  }

  buttonGroup: Button[] = [];
  addNewTaskButton(): void {
    this.buttonGroup = [
      {
        label: 'COMPLETE',
        src: 'assets/icons/done.svg',
        dataJob: this.utilityService.COMPLETE,
        id: this.id,
        ngstyle: { display: 'inline-block' },
      },
      {
        label: 'EDIT',
        src: 'assets/icons/edit.svg',
        dataJob: this.utilityService.EDIT,
        id: this.id,
        ngstyle: { display: 'inline-block' },
      },
      {
        label: 'DELETE',
        src: 'assets/icons/delete.svg',
        dataJob: this.utilityService.DELETE_TODO,
        id: this.id,
        ngstyle: { display: 'inline-block' },
      }
    ].map((button) => ({ ...button }));
  }
}
