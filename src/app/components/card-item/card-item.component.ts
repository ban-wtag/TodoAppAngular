import { Component, Input, QueryList, ViewChild, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
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

export class CardItemComponent implements OnDestroy{
  taskService: TaskService;
  utilityService: UtilityService;

  constructor(taskService: TaskService, utilityService: UtilityService){
    this.taskService = taskService;
    this.utilityService = utilityService;
  }
  @ViewChild(AddCardComponent) comp!: AddCardComponent;
  @Input() taskLists: Task[] = [];
  @ViewChildren('taskFocus') taskFoused!: QueryList<ElementRef>

  task: Task = new Task();
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  endDate!: number;
  timeoutId1!: ReturnType<typeof setTimeout>;
  timeoutId2!: ReturnType<typeof setTimeout>;

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

  

  clearTimeout(): void {
    this.timeoutId1 && clearTimeout(this.timeoutId1);
    this.timeoutId2 && clearTimeout(this.timeoutId2);
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
      case this.utilityService.EDIT:
        if (taskIndex >= 0) {
          this.onEditTask(taskIndex);
        }
        break;
      case this.utilityService.COMPLETE_AFTER_EDIT:
        if (taskIndex >= 0) {
          this.onCompeteAfterEditTask(taskIndex);
        }
        break;
      case this.utilityService.SAVE:
        if (taskIndex >= 0) {
          this.onSaveTask(taskIndex);
        }
        break;
      case this.utilityService.REVERT:
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