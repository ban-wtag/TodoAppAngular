import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  APP_TITLE : string = 'Add Tasks';
}
