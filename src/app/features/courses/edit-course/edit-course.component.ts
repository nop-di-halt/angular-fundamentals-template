import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CourseFormComponent } from '@app/shared/components';
import { Course } from '@app/shared/interfaces';
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

  onSubmit() {
    this.form.submitted = true;
    if (this.form.courseForm.valid) {
      const authorsCtrl = this.form.courseForm.get("authors") as FormArray;
      const course = {
        title: this.form.courseForm.controls["title"].value,
        description: this.form.courseForm.controls["description"].value,
        creationDate: this.course.creationDate,
        duration: this.form.courseForm.controls["duration"].value,
        authors: authorsCtrl.controls.map(c => c.value["id"]),
      };
      this.coursesStoreService.editCourse(this.courseId, course);
    } else {
      this.form.courseForm.markAllAsTouched();
    }
  }
}
