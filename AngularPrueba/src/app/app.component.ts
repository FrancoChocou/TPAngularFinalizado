import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [StudentListComponent]
})
export class AppComponent {
  title = 'tp-angular-migracion';
}