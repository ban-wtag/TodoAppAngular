import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/Task.model';

@Injectable({
  providedIn: 'root',
})

export class TaskService {
  taskList: Task[] = [];
}

