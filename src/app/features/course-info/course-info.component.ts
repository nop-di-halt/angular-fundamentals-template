import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';
import { State } from '@app/store';
import { requestSingleCourse } from '@app/store/courses/courses.actions';
import { getCourse } from '@app/store/courses/courses.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  course$!: Observable<Course | null>;
  courseId: string;

  constructor(activatedRoute: ActivatedRoute, private store: Store<State>) {
    this.courseId = activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.store.dispatch(requestSingleCourse({ id: this.courseId }));
    this.course$ = this.store.select(getCourse);
  }
}
