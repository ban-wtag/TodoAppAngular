import { Component, OnDestroy, ViewChild} from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task.model';
import { NewTaskInputDirective } from 'src/app/directives/new-task-input.directive';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})

export class AddCardComponent implements OnDestroy {
  constructor(
   private utilityService: UtilityService,
   private taskService: TaskService
  ) {}

  @ViewChild(NewTaskInputDirective) newTaskInputDirective!: NewTaskInputDirective;
  task: Task = new Task();
  newTask = '';
  tasks: string[] = [];

  onAddTaskToTaskList() {
    this.newTask = this.newTask.replace(/(<([^>]+)>)/g, "").trim();

    if (this.newTask != '') {
      const newlyCreatedTask: Task = {
        name: this.newTask,
        id: this.task.id,
        done: this.task.done,
        startDate: Date.now(),
      };
      this.taskService.addTaskToTaskList(newlyCreatedTask);
      this.newTask = '';
      this.utilityService.show = false;
    } else {
      this.utilityService.setFocusWithTimeout(this.newTaskInputDirective);
    }
  }

  onResetInput() {
    this.utilityService.show = false;
    this.newTask = '';
  }

  ngOnDestroy(): void {
    this.utilityService.clearTimeout();
  }
}
