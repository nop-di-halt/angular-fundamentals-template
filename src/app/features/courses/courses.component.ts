import { Component, Input } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';
import { State } from '@app/store';
import { requestAllCourses } from '@app/store/courses/courses.actions';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { getAllCourses } from '@app/store/courses/courses.selectors';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses$!: Observable<Course[]>;
  constructor(public userStoreService: UserStoreService, private facade: CoursesStateFacade) {
    this.facade.getAllCourses();
  }

  search(value: string) {
    this.facade.getFilteredCourses(value);
  }

  ngOnInit() {
    this.courses$ = this.facade.allCourses$;
  }
}
