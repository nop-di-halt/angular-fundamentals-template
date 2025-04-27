import { Component, Input } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
 @Input()
  courses: { id: string }[] = mockedCoursesList.map(c => (
    {
      id: c.id,
      title: c.title,
      description: c.description,
      creationDate: c.creationDate,
      duration: c.duration,
      authors: c.authors.map(id => mockedAuthorsList.find(author => author.id == id)?.name)
    }))
  //courses!: { id: string }[];

  ngOnInit(){
    console.log("Courses");
  }
}
