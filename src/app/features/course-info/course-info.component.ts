import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit{
  course!: Course
  courseId: string;

  constructor(private coursesStoreService: CoursesStoreService, activatedRoute: ActivatedRoute) {
    this.courseId = activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.coursesStoreService.getCourse(this.courseId);
    this.coursesStoreService.courses$.subscribe(course => this.course = course as Course);
    console.log(this.course);
  }
}
