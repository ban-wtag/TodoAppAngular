import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ConstantsService } from 'src/app/services/constants.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task.model';
import { TaskEventData } from 'src/app/models/TaskEventData';

@Component({
  selector: 'app-task-button',
  templateUrl: './task-button.component.html',
  styleUrls: ['./task-button.component.css'],
})

export class TaskButtonComponent implements OnInit {
  @Input() id!: number;
  @Input() task: any;
  @Output() taskButtonClick = new EventEmitter<TaskEventData>();
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

  onTaskButtonClick({ dataJob, id }: TaskEventData): void {

    switch (dataJob) {
      case this.constantsService.COMPLETE:    
        this.taskButtonClick.emit({id, dataJob});
        break;
  
      case this.constantsService.DELETE_TODO:
        this.taskButtonClick.emit({id, dataJob});
        break;
    }
  }

  visibilityHandle({dataJob}: {dataJob: any}, task: Task): boolean {
    switch (dataJob) {
      case 'edit':
        return !!task.showEditButton;
      case 'delete':
        return !!task.showDeleteButton;
      case 'complete':
        return !!task.showCompleteButton;
      default:
        return false;
    }
  }
}
