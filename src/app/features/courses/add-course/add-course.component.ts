import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CourseFormComponent } from '@app/shared/components';
import { Course, CourseFormData } from '@app/shared/interfaces';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements AfterViewInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private facade: CoursesStateFacade) {
    this.facade.getAllAuthors();
  }

  @ViewChild(CourseFormComponent)
  form!: CourseFormComponent

  ngAfterViewInit(): void {
    this.facade.allAuthors$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(authors => {
        authors.forEach(a => this.form.authorsList.push(a));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(courseFormData: CourseFormData) {
    const course = Object.assign({} as Course, courseFormData);
    this.facade.createCourse(course);
  }
}
