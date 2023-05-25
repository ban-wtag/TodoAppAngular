import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddCardComponent } from './add-card.component';
import { CreateButtonModule } from 'src/app/components/create-button/create-button.module';
import { NewTaskInputModule } from 'src/app/directives/new-task-input.module'

describe('AddCardComponent', () => {
  let component: AddCardComponent;
  let fixture: ComponentFixture<AddCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateButtonModule, NewTaskInputModule, FormsModule],
      declarations: [AddCardComponent],
    });
    fixture = TestBed.createComponent(AddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
