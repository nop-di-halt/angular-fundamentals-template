import { Component, Input } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses$ = this.coursesStoreService.courses$ as Observable<Course[]>;
  isLoading$ = this.coursesStoreService.isLoading$;

  constructor(private coursesStoreService: CoursesStoreService, public userStoreService:UserStoreService) { }

  ngOnInit() {
    this.coursesStoreService.getAll();
  }
}
