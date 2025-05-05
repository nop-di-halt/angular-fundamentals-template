import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course} from '@app/shared/interfaces';
import { State } from '@app/store';
import { requestSingleCourse } from '@app/store/courses/courses.actions';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { getCourse } from '@app/store/courses/courses.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  course$!: Observable<Course| null>;
  courseId: string;

  constructor(activatedRoute: ActivatedRoute, private facade: CoursesStateFacade) {
    this.courseId = activatedRoute.snapshot.params["id"];
    this.facade.getSingleCourse(this.courseId);
  }

  ngOnInit() {
    this.course$ = this.facade.course$;
  }
}
