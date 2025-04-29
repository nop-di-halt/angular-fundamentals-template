import { Component, Input } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses$ = this.coursesStoreService.courses$ as Observable<Course[]>;
  isLoading$ = this.coursesStoreService.isLoading$;

  constructor(private coursesStoreService: CoursesStoreService) { }

  ngOnInit() {
    this.coursesStoreService.getAll();
  }
}
