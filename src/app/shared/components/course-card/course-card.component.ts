import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  
  @Input()
  course!: {
    id?: string;
    title?: string;
    description?: string;
    creationDate?: Date;
    duration?: number;
    authors?: string[];
  }

  @Input()
  isEditable!: boolean;

  @Output()
  clickOnShow = new EventEmitter<string>()

  showCourse() {
    this.clickOnShow.emit(this.course.id);
  }
}
