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

  newButtons: {
    dataJob: string;
    id: number;
    ngstyle: any;
    content: any;
  }[] = [];

  newAddButton(
    dataJob: string,
    id: number,
    ngstyle: any,
    content: any
  ): void {
    this.newButtons.push({ dataJob, id, ngstyle, content });
  }

  addnewNewTaskButton(): void {
    this.newAddButton(
      this.constantsService.COMPLETE,
      this.id,
      { display: 'inline-block' },
      `<img src="assets/icons/done.svg" alt="${ this.constantsService.COMPLETE }"/>`
    );
    this.newAddButton(
      this.constantsService.EDIT,
      this.id,
      { display: 'inline-block' },
      `<img src="assets/icons/edit.svg" alt="${ this.constantsService.EDIT }"/>`
    );
    this.newAddButton(
      this.constantsService.DELETE_TODO,
      this.id,
      { display: 'inline-block' },
      `<img src="assets/icons/delete.svg" alt="${ this.constantsService.DELETE_TODO }"/>`
    );
    this.newAddButton(
      this.constantsService.SAVE,
      this.id,
      { display: 'inline-block' },
      `Save`
    );
    this.newAddButton(
      this.constantsService.COMPLETE_AFTER_EDIT,
      this.id,
      { display: 'inline-block' },
      `<img src="assets/icons/done.svg" alt="${ this.constantsService.COMPLETE_AFTER_EDIT }"/>`
    );
    this.newAddButton(
      this.constantsService.REVERT,
      this.id,
      { display: 'inline-block' },
      `<img src="assets/icons/delete.svg" alt="${ this.constantsService.REVERT}"/>`
    );
  }

  constructor(
    public constantsService: ConstantsService,
    public taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.addnewNewTaskButton();
  }

  onTaskButtonClick({ dataJob, id }: TaskEventData): void {
    switch (dataJob) {
      case this.constantsService.COMPLETE:   
        this.taskButtonClick.emit({id, dataJob});
        break;
      case this.constantsService.DELETE_TODO:
        this.taskButtonClick.emit({id, dataJob});
        break;
      case this.constantsService.EDIT:
        this.taskButtonClick.emit({id, dataJob});
        break;
      case this.constantsService.COMPLETE_AFTER_EDIT:
        this.taskButtonClick.emit({id, dataJob});
        break;
      case this.constantsService.SAVE:
        this.taskButtonClick.emit({id, dataJob});
        break;
      case this.constantsService.REVERT:
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
      case 'revert':
        return !!task.showRevertButton;
      case 'save':
        return !!task.showSaveButton;
      case 'completeAfterEdit':
        return !!task.showSaveButton;
      default:
        return false;
    }
  }
}
