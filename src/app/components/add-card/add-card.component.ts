import { Component, OnDestroy, ViewChild } from '@angular/core';
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

  @ViewChild(NewTaskInputDirective) newTaskInputDirective!: NewTaskInputDirective;

  task: Task = new Task();
  newTask = '';
  tasks: string[] = [];
  TODAY: Date = new Date();
  endDate!: number;
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  timeoutId: any;

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
        showCompleteButton: this.task.showCompleteButton,
        showDeleteButton: this.task.showDeleteButton,
        showEditButton: this.task.showEditButton,
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

  onCompleteTask(taskIndex: number){
    this.taskService.taskList[taskIndex].done = true;
    this.taskService.taskList[taskIndex].showCompleteButton = false;
    this.taskService.taskList[taskIndex].showEditButton = false;  
  }

  calculateDuration(startDate: number): number{
    this.endDate = Date.now();
    return Math.floor(Math.abs((this.endDate - startDate)/this.constantsService.MS_PER_DAY) + 1);
  }

  onTaskButtonClick(event: {id: number, dataJob: string}): void {
    const id = event.id;
    const dataJob = event.dataJob;

    const taskIndex = this.taskService.taskList.findIndex(task => task.id === id);

    if (taskIndex !== -1 && dataJob === this.constantsService.COMPLETE) {
      this.onCompleteTask(taskIndex);
    }
    if (taskIndex !== -1 && dataJob === this.constantsService.DELETE_TODO) {
      this.taskService.taskList.splice(taskIndex, 1);
    } 
    else{
      return;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
