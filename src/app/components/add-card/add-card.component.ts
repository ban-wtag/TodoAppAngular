import { Component, OnDestroy, QueryList, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { formatDate } from '@angular/common';
import * as DOMPurify from 'dompurify';

import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { ConstantsService } from 'src/app/services/constants.service';
import { Task } from 'src/app/models/Task.model';
import { NewTaskInputDirective } from 'src/app/directives/new-task-input.directive';
import { TaskEventData } from 'src/app/models/TaskEventData';

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
  @ViewChildren('taskFocus') taskFoused!: QueryList<ElementRef>

  selectedTaskId: number | null = null;

  task: Task = new Task();
  newTask = '';
  tasks: string[] = [];
  TODAY: Date = new Date();
  endDate!: number;
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  timeoutId1: any;
  timeoutId2: any;

  onAddTaskToTaskList() {
    this.newTask = DOMPurify.sanitize(this.newTask.trim());

    if (this.newTask != '') {
      const newlyCreatedTask: Task = {
        name: this.newTask,
        id: this.task.id++,
        done: this.task.done,
        edit: this.task.edit,
        trash: this.task.trash,
        editable: this.task.editable,
        startDate: Date.now(),
        showCompleteButton: this.task.showCompleteButton,
        showDeleteButton: this.task.showDeleteButton,
        showEditButton: this.task.showEditButton,
        showRevertButton: this.task.showRevertButton,
        showSaveButton: this.task.showSaveButton,
        showCompleteAfterEditButton: this.task.showCompleteAfterEditButton,
      };

      this.taskService.taskList.unshift(newlyCreatedTask);
      this.newTask = '';
      this.utilityService.show = false;
    } else {
      this.setFocusWithTimeout();
    }
    console.log("this.taskService.taskList", this.taskService.taskList);
  }

  onShowInput() {
    this.utilityService.show = true;
    this.setFocusWithTimeout();
  }

  private setFocusWithTimeout(): void {
    this.timeoutId1 = setTimeout(() => {
      this.newTaskInputDirective.focus();
    }, 0);
  }

  private clearTimeout(): void {
    this.timeoutId1 && clearTimeout(this.timeoutId1);
    this.timeoutId2 && clearTimeout(this.timeoutId2);
  }

  onResetInput() {
    this.utilityService.show = false;
    this.newTask = '';
  }

  onTaskFocused(index:number){
    console.log("index", index);
    console.log("view children ", this.taskFoused);
    this.timeoutId2 = setTimeout(() => {
      this.taskFoused.toArray()[index].nativeElement.focus();
    }, 0);    
  }

  onSaveTask(taskIndex: number){
    this.onTaskFocused(taskIndex);
    this.taskService.taskList[taskIndex].editable = false; 
    this.taskService.taskList[taskIndex].edit = false;
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    this.taskService.taskList[taskIndex].showCompleteButton = true;
    this.taskService.taskList[taskIndex].showEditButton = true; 
    this.taskService.taskList[taskIndex].showDeleteButton = true;
    this.taskService.taskList[taskIndex].showSaveButton = false;
    this.taskService.taskList[taskIndex].showCompleteAfterEditButton = false;
    this.taskService.taskList[taskIndex].showRevertButton = false;
    console.log("taskList ", this.taskService.taskList);
  }

  onRevertTask(taskIndex: number){
    const prevTask = this.taskService.taskList[taskIndex].name;
    console.log("prevTask ", prevTask);
    this.taskService.taskList[taskIndex].edit = false;
    this.taskService.taskList[taskIndex].editable = false; 
    this.taskService.taskList[taskIndex].name = prevTask;
    this.taskFoused.toArray()[taskIndex].nativeElement.innerText = prevTask;
    this.taskService.taskList[taskIndex].showCompleteButton = true;
    this.taskService.taskList[taskIndex].showEditButton = true; 
    this.taskService.taskList[taskIndex].showDeleteButton = true;
    this.taskService.taskList[taskIndex].showSaveButton = false;
    this.taskService.taskList[taskIndex].showCompleteAfterEditButton = false;
    this.taskService.taskList[taskIndex].showRevertButton = false;
    console.log("taskList ", this.taskService.taskList);
  }

  onEditTask(taskIndex: number){
    this.taskService.taskList[taskIndex].editable = true;
    this.onTaskFocused(taskIndex);
    this.taskService.taskList[taskIndex].edit = true;
    this.taskService.taskList[taskIndex].showCompleteButton = false;
    this.taskService.taskList[taskIndex].showEditButton = false; 
    this.taskService.taskList[taskIndex].showDeleteButton = false;
    this.taskService.taskList[taskIndex].showSaveButton = true;
    this.taskService.taskList[taskIndex].showCompleteAfterEditButton = true;
    this.taskService.taskList[taskIndex].showRevertButton = true;
  }

  onCompleteTask(taskIndex: number){
    this.taskService.taskList[taskIndex].done = true;
    this.taskService.taskList[taskIndex].showCompleteButton = false;
    this.taskService.taskList[taskIndex].showEditButton = false; 
    this.taskService.taskList[taskIndex].showDeleteButton = true;
    this.taskService.taskList[taskIndex].showSaveButton = false;
    this.taskService.taskList[taskIndex].showCompleteAfterEditButton = false;
    this.taskService.taskList[taskIndex].showRevertButton = false; 
    this.taskService.taskList[taskIndex].editable = false; 
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    console.log("taskList ", this.taskService.taskList);
  }

  calculateDuration(startDate: number): number{
    this.endDate = Date.now();
    return Math.floor(Math.abs((this.endDate - startDate)/this.constantsService.MS_PER_DAY) + 1);
  }

  handleTaskButtonClick({id, dataJob}: TaskEventData): void {
    const taskIndex = this.taskService.taskList.findIndex(task => task.id === id);
    console.log("on handle task button");
    switch (dataJob) {
      case this.constantsService.COMPLETE:
        if (taskIndex >= 0) {
          this.onCompleteTask(taskIndex);
        }
        break;
      case this.constantsService.DELETE_TODO:
        if (taskIndex >= 0) {
          this.taskService.taskList.splice(taskIndex, 1);
        }
        break;
      case this.constantsService.EDIT:
        if (taskIndex >= 0) {
          this.onEditTask(taskIndex);
        }
        break;
      case this.constantsService.COMPLETE_AFTER_EDIT:
        if (taskIndex >= 0) {
          this.onCompleteTask(taskIndex);
        }
        break;
      case this.constantsService.SAVE:
        if (taskIndex >= 0) {
          console.log("clickedonSaveTask");
          this.onSaveTask(taskIndex);
        }
        break;
      case this.constantsService.REVERT:
        if (taskIndex >= 0) {
          console.log("clickedonREVERTTask");
          this.onRevertTask(taskIndex);
        }
        break;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
