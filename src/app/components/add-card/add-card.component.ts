import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import * as DOMPurify from 'dompurify';

import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { Task } from 'src/app/models/Task.model';
import { NewTaskInputDirective } from 'src/app/directives/new-task-input.directive';


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})

export class AddCardComponent implements OnDestroy {
  utilityService: UtilityService;
  taskService: TaskService;
  constantsService: ConstantsService;
  constructor(
    utilityService: UtilityService,
    taskService: TaskService,
    constantsService: ConstantsService
  ) {
    this.utilityService = utilityService;
    this.taskService = taskService;
    this.constantsService = constantsService;
  }

  @ViewChild(NewTaskInputDirective)
  newTaskInputDirective!: NewTaskInputDirective;

  @ViewChild('newTaskInput') newTaskInput!: ElementRef;
  name = '';
  id = 0;
  done = false;
  edit = false;
  trash = false;
  lastId = 0;
  startDate: number = Date.now();

  newTask = '';
  tasks: string[] = [];
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');

  private timeoutId: any;

  onAddTaskToTaskList() {
    this.newTask = DOMPurify.sanitize(this.newTask.trim());

    if (this.newTask != '') {
      const newlyCreatedTask: Task = {
        name: this.newTask,
        id: this.task.id++,
        done: this.task.done,
        edit: this.task.edit,
        trash: this.task.trash,
        startDate: Date.now(),
      };

      this.taskService.taskList.unshift(newlyCreatedTask);
      this.newTask = '';
      this.utilityService.show = false;
    } else {
      this.setFocusWithTimeout();
    }
  }

  onShowInput() {
    this.utilityService.show = true;
    this.setFocusWithTimeout();
  }

  private setFocusWithTimeout(): void {
    this.timeoutId = setTimeout(() => {
      this.newTaskInputDirective.focus();
    }, 0);
  }

  private clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  onResetInput() {
    this.utilityService.show = false;
    this.newTask = '';
  }
}
