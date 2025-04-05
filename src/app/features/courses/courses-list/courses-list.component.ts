import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input()
  courses!: { id: string }[];

  @Input()
  editable: boolean = true;

  @Output()
  showCourse = new EventEmitter<string>();

  @Output()
  editCourse = new EventEmitter<string>();

  @Output()
  deleteCourse = new EventEmitter<string>();

  deleteIcon = faTrash;
  editIcon = faEdit;

  showCourseInfo($event: string) {
    this.showCourse.emit($event);
  }

  onEditCourseClick(id: string) {
    this.editCourse.emit(id);
  }

  onDeleteCourseClick(id: string) {
    this.deleteCourse.emit(id);
  }
}

