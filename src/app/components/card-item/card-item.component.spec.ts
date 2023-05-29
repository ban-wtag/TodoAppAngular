import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardItemComponent } from './card-item.component';
import { TaskButtonModule } from 'src/app/components/task-button/task-button.module';
import { AddCardModule } from 'src/app/components/add-card/add-card.module';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task.model';
import { TaskEventData } from 'src/app/models/TaskEventData';

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;
  let utilityService: UtilityService;
  let taskService: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskButtonModule, AddCardModule],
      declarations: [CardItemComponent],
      providers: [UtilityService, TaskService],
    });

    fixture = TestBed.createComponent(CardItemComponent);

    component = fixture.componentInstance;
    utilityService = TestBed.inject(UtilityService);
    taskService = TestBed.inject(TaskService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display app-add-card component if utilityService.show is true', () => {
    utilityService.show = true;
    fixture.detectChanges();
    const addCardElement = fixture.debugElement.query(By.css('app-add-card'));
    expect(addCardElement).toBeTruthy();
  });

  it('should render exact number of tasks', () => {
    const initialTaskList: Task = { 
      name: 'Task 1', 
      id: 1, 
      done: false,   
      editable: false,
      startDate: Date.now(), 
      
    };
    
    taskService.taskList.push(initialTaskList);
    fixture.detectChanges();
    expect(component.taskList.length).toBe(1);

    const taskListElements =
      fixture.nativeElement.querySelectorAll('.taskList');
    expect(taskListElements.length).toBe(taskService.taskList.length);
  });

  it('should delete task when dataJob is DELETE_TODO', () => {
    const initialTaskList: Task = {
      name: 'Task 3',
      id: 3,
      done: false,
      editable: false,
      startDate: Date.now(),
    };

    taskService.taskList.push(initialTaskList);
    fixture.detectChanges();
    const eventData: TaskEventData = {
      index: initialTaskList.id,
      dataJob: utilityService.DELETE_TODO,
    };
    component.handleTaskButtonClick(eventData);
    fixture.detectChanges();
    expect(component.taskList.length).toBe(0);

    const taskListElements =
      fixture.nativeElement.querySelectorAll('.taskList');
    expect(taskListElements.length).toBe(taskService.taskList.length);
  });

  it('should display the duration if task.done is true', () => {
    const task: Task = {
      name: 'Task 3',
      id: 3,
      done: false,
      editable: false,
      startDate: Date.now(),
    };

    taskService.taskList.push(task);
    fixture.componentInstance.task = task;
    fixture.componentInstance.task.done = true;
    fixture.detectChanges();
    const paragraphElement = fixture.debugElement.query(By.css('.duration'));
    fixture.detectChanges();
    expect(paragraphElement).toBeTruthy();
  });
});
