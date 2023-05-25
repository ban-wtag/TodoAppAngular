import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task.model';
import { Button } from 'src/app/models/Button.model';
import { TaskEventData } from 'src/app/models/TaskEventData';

@Component({
  selector: 'app-task-button',
  templateUrl: './task-button.component.html',
  styleUrls: ['./task-button.component.css'],
})

export class TaskButtonComponent implements OnInit {
 @Input()id  = 0;
 @Input() task: any;
 @Output() taskButtonClick = new EventEmitter<TaskEventData>();

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
     },
     {
       label: 'SAVE',
       src: 'assets/icons/logo.svg',
       dataJob: this.utilityService.SAVE,
       id: this.id,
       ngstyle: { display: 'inline-block' },
     },
     {
       label: 'COMPLETE_AFTER_EDIT',
       src: 'assets/icons/done.svg',
       dataJob: this.utilityService.COMPLETE_AFTER_EDIT,
       id: this.id,
       ngstyle: { display: 'inline-block' },
     },
     {
       label: 'REVERT',
       src: 'assets/icons/delete.svg',
       dataJob: this.utilityService.REVERT,
       id: this.id,
       ngstyle: { display: 'inline-block' },
     }
   ].map((button) => ({ ...button }));
 }

 onTaskButtonClick({ dataJob, id }: TaskEventData): void {
   switch (dataJob) {
     case this.utilityService.COMPLETE:   
       this.taskButtonClick.emit({id, dataJob});
       break;
     case this.utilityService.DELETE_TODO:
       this.taskButtonClick.emit({id, dataJob});
       break;
     case this.utilityService.EDIT:
       this.taskButtonClick.emit({id, dataJob});
       break;
     case this.utilityService.COMPLETE_AFTER_EDIT:
       this.taskButtonClick.emit({id, dataJob});
       break;
     case this.utilityService.SAVE:
       this.taskButtonClick.emit({id, dataJob});
       break;
     case this.utilityService.REVERT:
       this.taskButtonClick.emit({id, dataJob});
       break;
   }
 }

 visibilityHandle({dataJob}: {dataJob: any}, task: Task): boolean {
   switch (dataJob) {
     case this.utilityService.EDIT:
       return !!task.showEditButton;
     case this.utilityService.DELETE_TODO:
       return !!task.showDeleteButton;
     case this.utilityService.COMPLETE:
       return !!task.showCompleteButton;
     case this.utilityService.REVERT:
       return !!task.showRevertButton;
     case this.utilityService.SAVE:
       return !!task.showSaveButton;
     case this.utilityService.COMPLETE_AFTER_EDIT:
       return !!task.showSaveButton;
     default:
       return false;
   }
 }
}
