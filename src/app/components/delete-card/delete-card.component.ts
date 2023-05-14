import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.css'],
})
export class DeleteCardComponent implements OnInit {
  constructor(public taskService: TaskService) {}
  ngOnInit(): void {}
  deleteTask(task: Task) {
    console.log('on Delete Task');
  }
}
