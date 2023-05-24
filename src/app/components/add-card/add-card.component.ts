import { Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild(NewTaskInputDirective)
  newTaskInputDirective!: NewTaskInputDirective;

  task: Task = new Task();
  newTask = '';
  tasks: string[] = [];
  timeoutId!: ReturnType<typeof setTimeout> 

  onAddTaskToTaskList() {
    this.newTask = this.newTask.replace(/(<([^>]+)>)/g, "").trim();

    if (this.newTask != '') {
      const newlyCreatedTask: Task = {
        name: this.newTask,
        id: this.task.id,
        done: this.task.done,
        edit: this.task.edit,
        trash: this.task.trash,
        startDate: Date.now(),
      };
    
      this.taskService.taskList.unshift(newlyCreatedTask);
      this.newTask = '';
      this.utilityService.show = false;
      console.log("tasks list ", this.taskService.taskList);
    } else {
      this.setFocusWithTimeout();
    }
  }
 
  setFocusWithTimeout(): void {
    this.timeoutId = setTimeout(() => {
       this.newTaskInputDirective.focus();
    }, 0);
  }

  clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  onResetInput() {
    this.utilityService.show = false;
    this.newTask = '';
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
