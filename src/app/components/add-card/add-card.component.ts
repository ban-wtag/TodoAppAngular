import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { formatDate } from '@angular/common';
import * as DOMPurify from 'dompurify';

import { UtilityService } from 'src/app/utility.service';
import { TaskService } from 'src/app/task.service';
import { ConstantsService } from 'src/app/constants.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  constructor(
    public utilityService: UtilityService,
    public taskService: TaskService,
    public constantsService: ConstantsService
  ) {}

  ngOnInit(): void {}

  @ViewChild('newTaskInput') newTaskInput!: ElementRef;
  name: string = '';
  id: number = 0;
  done: boolean = false;
  edit: boolean = false;
  trash: boolean = false;
  lastId: number = 0;
  startDate: number = Date.now();

  newTask: string = '';
  tasks: string[] = [];
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');

  addTaskToTaskList() {
    this.newTask = this.newTask.trim();
    this.newTask = DOMPurify.sanitize(this.newTask);

    if (this.newTask != '') {
      const newlyCreatedTask = {
        name: this.newTask,
        id: this.id++,
        done: this.done,
        edit: this.edit,
        trash: this.trash,
        startDate: Date.now(),
      };
      this.taskService.taskList.unshift(newlyCreatedTask);
      this.newTask = '';
      this.utilityService.show = false;
    } else {
      setTimeout(() => this.newTaskInput.nativeElement.focus(), 0);
    }
  }

  showInput() {
    this.utilityService.show = true;
    setTimeout(() => this.newTaskInput.nativeElement.focus(), 0);
  }

  resetInput() {
    this.utilityService.show = false;
    this.newTask = '';
  }
}
