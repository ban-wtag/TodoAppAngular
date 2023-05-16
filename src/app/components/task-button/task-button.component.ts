import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-button',
  templateUrl: './task-button.component.html',
  styleUrls: ['./task-button.component.css'],
})

export class TaskButtonComponent implements OnInit {
  @Input() id!: number;
  @Output() taskButtonClick: EventEmitter<{id: number, dataJob: string}> = new EventEmitter<{id: number, dataJob: string}>();
  
  buttons: {
    label: string;
    src: string;
    dataJob: string;
    id: number;
    ngstyle: any;
  }[] = [];

  constructor(
    public constantsService: ConstantsService,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.addNewTaskButton();
  }

  addButton(
    label: string,
    src: string,
    dataJob: string,
    id: number,
    ngstyle: any
  ): void {
    this.buttons.push({ label, src, dataJob, id, ngstyle });
  }

  addNewTaskButton(): void {
    this.addButton(
      'Complete',
      'assets/icons/done.svg',
      this.constantsService.COMPLETE,
      this.id,
      { display: 'inline-block' }
    );
    this.addButton(
      'EDIT',
      'assets/icons/edit.svg',
      this.constantsService.EDIT,
      this.id,
      { display: 'inline-block' }
    );
    this.addButton(
      'DELETE',
      'assets/icons/delete.svg',
      this.constantsService.DELETE_TODO,
      this.id,
      { display: 'inline-block' }
    );
  }
  TaskButtonClick({dataJob, id} : {dataJob: any, id: number}): void {
    switch (dataJob){
    case this.constantsService.COMPLETE:
      this.taskButtonClick.emit({id, dataJob});
      break;
    case this.constantsService.EDIT:
      this.taskButtonClick.emit({id, dataJob});
      break;
    case this.constantsService.DELETE_TODO:
      this.taskButtonClick.emit({id, dataJob});
      break;
    default:
      break;
    }
  }
}
