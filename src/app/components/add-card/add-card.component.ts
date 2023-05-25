import { Component, OnDestroy, ViewChild} from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
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
  constructor(
    utilityService: UtilityService,
    taskService: TaskService
  ) {
    this.utilityService = utilityService;
    this.taskService = taskService
  }

  @ViewChild(NewTaskInputDirective) newTaskInputDirective!: NewTaskInputDirective;

  task: Task = new Task();
  newTask = '';
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
        showCompleteButton: this.task.showCompleteButton,
        showDeleteButton: this.task.showDeleteButton,
        showEditButton: this.task.showEditButton,
      };
      this.taskService.addTaskToTaskList(newlyCreatedTask);
      this.newTask = '';
      this.utilityService.show = false;
    } else {
      this.setFocusWithTimeout();
    }
  }
 
  setFocusWithTimeout(): void {
    this.timeoutId = setTimeout(() => {
      this.newTaskInputDirective.focus();
    }, 0);
  }

  onResetInput() {
    this.utilityService.show = false;
    this.newTask = '';
  }

  clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}
