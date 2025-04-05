import { Component } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  course!: {
    id?: string;
    title?: string;
    description?: string;
    creationDate?: Date;
    duration?: number;
    authors?: string[];
  }
}
