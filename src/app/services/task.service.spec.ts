import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { Task } from 'src/app/models/Task.model'

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task at the beginning of the task list', () => {
    const initialTaskList: Task = { name: 'Task 1', id: 1, done: false, startDate: Date.now()};
    service.taskList.push(initialTaskList);
    const initialTaskLength = service.taskList.length;

    const tasks: Task = { name: 'Task 0', id: 0, done: false, startDate: Date.now() };
    service.addTaskToTaskList(tasks);

    const updatedTaskList = service.taskList;
    const updatedTaskListLength = updatedTaskList.length;

    expect(updatedTaskListLength).toEqual(initialTaskLength + 1);
    expect(updatedTaskList[0]).toEqual(tasks);
  });

  it('should add a task to the task list', () => {
    const task: Task = { name: 'Task 3', id: 3, done: false, startDate: Date.now() };
    service.addTaskToTaskList(task);
    const updatedTaskList = service.taskList;

    expect(updatedTaskList.length).toBe(1);
    expect(updatedTaskList[0]).toEqual(task);
  });
});
