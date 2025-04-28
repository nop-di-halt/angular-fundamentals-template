import { Component, Input } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Course } from '@app/shared/interfaces';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  constructor(private coursesService: CoursesService) { }

  courses!: Course[];

  ngOnInit() {
    this.coursesService.getAll().subscribe(coursesResponse => {
      if (coursesResponse.successful) {
        this.coursesService.getAllAuthors().subscribe(authorsResponse => {
          if (authorsResponse.successful) {
            const courses = coursesResponse.result;
            courses.forEach(c => c.authors = c.authors.map(id => authorsResponse.result.find(a => a.id == id)?.name || ""));
            this.courses = courses;
          }
        });
      }
    });
  }
}
