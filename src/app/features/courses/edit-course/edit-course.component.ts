import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CourseFormComponent } from '@app/shared/components';
import { Course, CourseFormData, CourseRequest } from '@app/shared/interfaces';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, AfterViewInit, OnDestroy {
  course!: Course;
  courseId: string;
  private destroyed$ = new Subject<void>();
  constructor(private coursesStoreService: CoursesStoreService, activatedRoute: ActivatedRoute, private router: Router) {
    this.courseId = activatedRoute.snapshot.params["id"];
  }

  @ViewChild(CourseFormComponent)
  form!: CourseFormComponent

  ngOnInit() {
    this.coursesStoreService.getCourse(this.courseId);
    this.coursesStoreService.getAllAuthors();
  }

  ngAfterViewInit(): void {
    combineLatest([
      this.coursesStoreService.result$,
      this.coursesStoreService.authors$
    ])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([course, authors]) => {
        this.course = course as Course;
        this.form.courseForm.patchValue(this.course);

        const courseAuthors = authors.filter(a => this.course.authors.includes(a.id));
        const availableAuthors = authors.filter(a => !this.course.authors.includes(a.id));
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
    const courseReq = Object.assign({} as CourseRequest, courseFormData);
    courseReq.creationDate = this.course.creationDate;
    this.coursesStoreService.editCourse(this.courseId, courseReq);
    this.coursesStoreService.isProcessing$.pipe(takeUntil(this.destroyed$)).subscribe(isProcessing => {
      if (!isProcessing) {
        this.router.navigate(['/courses']);
      }
    });
  }
}
