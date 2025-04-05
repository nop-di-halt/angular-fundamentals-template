import { Component } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from './shared/mocks/mocks';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  isLoggedIn: boolean = false;
  userName: string = "";

  courses: { id: string }[] = mockedCoursesList.map(c => (
    {
      id: c.id,
      title: c.title,
      description: c.description,
      creationDate: c.creationDate,
      duration: c.duration,
      authors: c.authors.map(id => mockedAuthorsList.find(author => author.id == id)?.name)
    }));
}
