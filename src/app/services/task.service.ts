import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task.model';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  taskList: Task[] = [];
  
  addTaskToTaskList(taskList: Task) {
    this.taskList.unshift(taskList);
  }

  gettaskList() {
    return this.taskList;
  }
}

