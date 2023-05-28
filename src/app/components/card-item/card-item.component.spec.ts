import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardItemComponent } from './card-item.component';
import { TaskButtonModule } from 'src/app/components/task-button/task-button.module';
import { AddCardModule } from 'src/app/components/add-card/add-card.module';
import { UtilityService } from 'src/app/services/utility.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task.model'

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
    const initialTaskList: Task = { name: 'Task 1', id: 1, done: false, startDate: Date.now()};
    taskService.taskList.push(initialTaskList);
    fixture.detectChanges();
    expect(component.taskList.length).toBe(1);

    const taskListElements = fixture.nativeElement.querySelectorAll('.taskList');
    expect(taskListElements.length).toBe(taskService.taskList.length);
  });

});
