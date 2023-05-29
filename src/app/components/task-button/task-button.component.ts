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
 @Input() task: Task = new Task();
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
       content:  `<img src="assets/icons/done.svg" alt="${ this.utilityService.COMPLETE }"/>`,
     },
     {
       label: 'EDIT',
       src: 'assets/icons/edit.svg',
       dataJob: this.utilityService.EDIT,
       content:  `<img src="assets/icons/edit.svg" alt="${ this.utilityService.EDIT }"/>`,
     },
     {
       label: 'DELETE',
       src: 'assets/icons/delete.svg',
       dataJob: this.utilityService.DELETE_TODO,
       content:  `<img src="assets/icons/delete.svg" alt="${ this.utilityService.DELETE_TODO }"/>`,
     },
     {
       label: 'SAVE',
       src: 'assets/icons/logo.svg',
       dataJob: this.utilityService.SAVE,
       content: `Save`,
     },
     {
       label: 'COMPLETE_AFTER_EDIT',
       src: 'assets/icons/done.svg',
       dataJob: this.utilityService.COMPLETE_AFTER_EDIT,
       content:    `<img src="assets/icons/done.svg" alt="${ this.utilityService.COMPLETE_AFTER_EDIT }"/>`,
     },
     {
       label: 'REVERT',
       src: 'assets/icons/delete.svg',
       dataJob: this.utilityService.REVERT,
       content:  `<img src="assets/icons/delete.svg" alt="${ this.utilityService.REVERT}"/>`,

     }
   ].map((button) => ({ ...button }));
 }

 getButtonClasses(button: any): string[] {
   const classes = ['taskButtonStyle'];
   if (!this.task.editable && ['delete', 'edit', 'complete'].indexOf(button.dataJob) === -1) {
     classes.push('hidden');
   }
   if (this.task.done && button.dataJob !== 'delete') {
     classes.push('hidden');
   }
   if (this.task.editable && ['save', 'revert', 'completeAfterEdit'].indexOf(button.dataJob) === -1) {
     classes.push('hidden');
   }
   return classes;
 }

 onTaskButtonClick({index, dataJob} : TaskEventData): void {
   switch (dataJob) {
     case this.utilityService.COMPLETE:    
       this.taskButtonClick.emit({index, dataJob});
       break;
     case this.utilityService.DELETE_TODO:
       this.taskButtonClick.emit({index, dataJob});
       break;
     case this.utilityService.EDIT:
       this.taskButtonClick.emit({index, dataJob});
       break;
     case this.utilityService.COMPLETE_AFTER_EDIT:
       this.taskButtonClick.emit({index, dataJob});
       break;
     case this.utilityService.SAVE:
       this.taskButtonClick.emit({index, dataJob});
       break;
     case this.utilityService.REVERT:
       this.taskButtonClick.emit({index, dataJob});
       break;
   }
 }
}
