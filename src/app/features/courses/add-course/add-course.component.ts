import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CourseFormComponent } from '@app/shared/components';
import { CourseFormData, CourseRequest } from '@app/shared/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  constructor(private coursesStoreService: CoursesStoreService, private router: Router) { }

  @ViewChild(CourseFormComponent)
  form!: CourseFormComponent

  ngOnInit() {
    this.coursesStoreService.getAllAuthors();
  }

  ngAfterViewInit(): void {
    this.coursesStoreService.authors$
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
    const courseReq = Object.assign({} as CourseRequest, courseFormData);
    const date = new Date(Date.now());
    courseReq.creationDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    this.coursesStoreService.createCourse(courseReq);
    this.coursesStoreService.isProcessing$.pipe(takeUntil(this.destroyed$)).subscribe(isProcessing => {
      if (!isProcessing) {
        this.router.navigate(['/courses']);
      }
    });
  }
}
