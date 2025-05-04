import { Component, Input } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';
import { State } from '@app/store';
import { requestAllCourses } from '@app/store/courses/courses.actions';
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
  //courses$ = this.coursesStoreService.courses$ as Observable<Course[]>;
  //isLoading$ = this.coursesStoreService.isLoading$;
  courses$ = this.store.select(getAllCourses);
  //constructor(private coursesStoreService: CoursesStoreService, public userStoreService:UserStoreService) { }
  constructor(private store: Store<State>) { }

  search(value: string) {
    //this.coursesStoreService.filterCourses(value)
  }

  ngOnInit() {
    //this.coursesStoreService.getAll();
    this.store.dispatch(requestAllCourses());
  }
}
