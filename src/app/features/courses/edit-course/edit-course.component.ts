import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CourseFormComponent } from '@app/shared/components';
import { Course } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit, AfterViewInit {
  course!: Course;
  courseId: string;

  constructor(private coursesStoreService: CoursesStoreService, activatedRoute: ActivatedRoute) {
    this.courseId = activatedRoute.snapshot.params["id"];
  }

  @ViewChild(CourseFormComponent)
  form!: CourseFormComponent

  ngOnInit() {
    this.coursesStoreService.getCourse(this.courseId);
    (this.coursesStoreService.courses$ as Observable<Course>).subscribe(course => this.course = course as Course);
  }

  ngAfterViewInit(): void {
    this.form.courseForm.patchValue(this.course);
    console.log(this.course);
  }

  onSubmit() {
    this.form.submitted = true;
    if (this.form.courseForm.valid) {
      this.form.courseForm.reset();
    } else {
      this.form.courseForm.markAllAsTouched();
    }
  }
}
