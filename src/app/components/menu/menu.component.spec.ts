import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { CreateButtonModule } from 'src/app/components/create-button/create-button.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let app_title: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateButtonModule],
      declarations: [MenuComponent],
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should title', () => {
    fixture.detectChanges();
    app_title = fixture.nativeElement.querySelector('h2');
    expect(app_title.textContent).toContain(component.APP_TITLE);
  })
  
});
