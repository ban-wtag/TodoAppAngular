import { Component, Input, QueryList, ViewChild, ViewChildren, ElementRef, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import { formatDate } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskEventData } from 'src/app/models/TaskEventData';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})

export class CardItemComponent implements OnDestroy {
  constructor(private taskService: TaskService, private utilityService: UtilityService){}
  
  @Input() taskLists: Task[] = [];
  @ViewChildren('taskFocus') taskFoused!: QueryList<ElementRef>

  task: Task = new Task();
  TODAY: Date = new Date();
  formattedDate = formatDate(this.TODAY, 'dd.MM.yy', 'en-GB');
  endDate!: number;
  timeoutId2!: ReturnType<typeof setTimeout>;
  taskList = this.taskService.gettaskList();
  utility = this.utilityService;

  clearTimeout(): void {
    this.timeoutId2 && clearTimeout(this.timeoutId2);
  }
  
  onTaskFocused(index:number){
    this.timeoutId2 = setTimeout(() => {
      this.taskFoused.toArray()[index].nativeElement.focus();
    }, 0);    
  }

  onSaveTask(taskIndex: number){
    const taskName = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    if(!taskName){
      console.log("what ever in empty task on save", this.taskService.taskList);
      this.onTaskFocused(taskIndex);
      return;
    }
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    this.taskService.taskList[taskIndex].editable = false;
  }

  onRevertTask(taskIndex: number){
    this.taskFoused.toArray()[taskIndex].nativeElement.innerText = this.taskService.taskList[taskIndex].name;
    this.taskService.taskList[taskIndex].editable = false;
  }

  onEditTask(taskIndex: number){
    this.onTaskFocused(taskIndex);
    this.taskService.taskList[taskIndex].editable = true;
  }

  onCompleteTask(taskIndex: number){
    this.taskService.taskList[taskIndex].done = true;
  }

  onCompeteAfterEditTask(taskIndex: number){
    const taskName = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    if(!taskName){
      this.onTaskFocused(taskIndex);
      return;
    }
    this.taskService.taskList[taskIndex].name = this.taskFoused.toArray()[taskIndex].nativeElement.innerText;
    this.taskService.taskList[taskIndex].editable = false;
    this.taskService.taskList[taskIndex].done = true;
  }

  handleTaskButtonClick({index, dataJob}: TaskEventData): void {
    const taskIndex = this.taskService.taskList.findIndex(task => task.id === index);

    switch (dataJob) {
      case this.utilityService.COMPLETE:
        if (taskIndex >= 0) {
          this.onCompleteTask(taskIndex);
        }
        break;
      case this.utilityService.DELETE_TODO:
        if (taskIndex >= 0) {
          this.taskService.taskList.splice(taskIndex, 1);
        }
        break;
      case this.utilityService.EDIT:
        if (taskIndex >= 0) {
          this.onEditTask(taskIndex);
        }
        break;
      case this.utilityService.COMPLETE_AFTER_EDIT:
        if (taskIndex >= 0) {
          this.onCompeteAfterEditTask(taskIndex);
        }
        break;
      case this.utilityService.SAVE:
        if (taskIndex >= 0) {
          this.onSaveTask(taskIndex);
        }
        break;
      case this.utilityService.REVERT:
        if (taskIndex >= 0) {
          this.onRevertTask(taskIndex);
        }
        break;
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }
}

