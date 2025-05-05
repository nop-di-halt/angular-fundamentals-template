import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseFormComponent } from '@app/shared/components';
import { Course, CourseFormData } from '@app/shared/interfaces';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements AfterViewInit, OnDestroy {
  course!: Course;
  courseId: string;
  private destroyed$ = new Subject<void>();
  constructor(activatedRoute: ActivatedRoute, private facade: CoursesStateFacade) {
    this.courseId = activatedRoute.snapshot.params["id"];
    this.facade.getSingleCourse(this.courseId);
    this.facade.getAllAuthors();
  }

  @ViewChild(CourseFormComponent)
  form!: CourseFormComponent

  ngAfterViewInit(): void {
    combineLatest([
      this.facade.course$,
      this.facade.allAuthors$
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([course, authors]) => {
        this.course = course as Course;
        this.form.courseForm.patchValue(this.course);

        const courseAuthors = authors.filter(a => this.course.authors.includes(a.name));
        const availableAuthors = authors.filter(a => !this.course.authors.includes(a.name));
        this.form.authorsList = availableAuthors;
        this.form.authors.clear();
        courseAuthors.forEach(a => this.form.authors.push(new FormControl({ value: a, disabled: true })));
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(courseFormData: CourseFormData) {
    const course = Object.assign({} as Course, courseFormData);
    this.facade.editCourse(this.courseId, course);
  }
}
