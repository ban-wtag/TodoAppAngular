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

  task: Task = new Task();
  newTask = '';
  tasks: string[] = [];
  TODAY: Date = new Date();
  endDate!: number;
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  timeoutId1!: any;
  timeoutId2!: any;
  propertiesToToggle: string[]= [
    'editable',
    'edit',
    'showCompleteButton',
    'showEditButton',
    'showDeleteButton',
    'showSaveButton',
    'showCompleteAfterEditButton',
    'showRevertButton'
  ]

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
        errorMessage: this.task.errorMessage,
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
    console.log("on Initial stage task ", this.taskService.taskList);
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
    this.timeoutId2 = setTimeout(() => {
      this.taskFoused.toArray()[index].nativeElement.focus();
    }, 0);    
  }

  onSaveTask(taskIndex: number){
    const taskName = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    if(!taskName){
      console.log("what ever in empty task on save", this.taskService.taskList);
      this.taskService.taskList[taskIndex].errorMessage = 'Please add Description';
      this.onTaskFocused(taskIndex);
      return;
    }
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    this.utilityService.toggleTaskProperties(taskIndex, ...this.propertiesToToggle);
    this.taskService.taskList[taskIndex].errorMessage = '';
  }

  onRevertTask(taskIndex: number){
    this.utilityService.toggleTaskProperties(taskIndex, ...this.propertiesToToggle);
    this.taskFoused.toArray()[taskIndex].nativeElement.innerText = this.taskService.taskList[taskIndex].name;
    console.log("on Revert button ", this.taskService.taskList);
    this.taskService.taskList[taskIndex].errorMessage = '';
  }

  onEditTask(taskIndex: number){
    this.utilityService.toggleTaskProperties(taskIndex, ...this.propertiesToToggle);
    this.onTaskFocused(taskIndex);
    console.log('on edit task ', this.taskService.taskList)
  }

  onCompleteTask(taskIndex: number){
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    this.utilityService.toggleTaskProperties(taskIndex, 'showCompleteButton', 'showEditButton', 'done');
    this.taskService.taskList[taskIndex].errorMessage = '';
  }

  onCompeteAfterEditTask(taskIndex: number){
    const taskName = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    if(!taskName){
      this.taskService.taskList[taskIndex].errorMessage = 'Please add Description';
      this.onTaskFocused(taskIndex);
      return;
    }
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    const propertiesToToggles = [
      'done',
      'edit',
      'editable',
      'showCompleteAfterEditButton',
      'showDeleteButton',
      'showRevertButton',
      'showSaveButton'
    ]
    this.utilityService.toggleTaskProperties(taskIndex, ...propertiesToToggles);
    this.taskService.taskList[taskIndex].errorMessage = '';
    console.log("on complete after task ",this.taskService.taskList);
  }

  handleTaskButtonClick({id, dataJob}: TaskEventData): void {
    const taskIndex = this.taskService.taskList.findIndex(task => task.id === id);
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
          this.onCompeteAfterEditTask(taskIndex);
        }
        break;
      case this.constantsService.SAVE:
        if (taskIndex >= 0) {
          this.onSaveTask(taskIndex);
        }
        break;
      case this.constantsService.REVERT:
        if (taskIndex >= 0) {
          this.onRevertTask(taskIndex);
        }
        break;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
