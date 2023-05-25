import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { CardItemModule } from 'src/app/components/card-item/card-item.module';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NavbarModule, MenuModule, CardItemModule],
      declarations: [AppComponent],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); //completely loaded or not
  }); 
});
