import { Injectable } from '@angular/core';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Task[] = [];
  constructor() {}
}
