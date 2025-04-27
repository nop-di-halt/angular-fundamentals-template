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
  onShowCourse = new EventEmitter<string>();

  @Output()
  onEditCourse = new EventEmitter<string>();

  @Output()
  onDeleteCourse = new EventEmitter<string>();

  deleteIcon = faTrash;
  editIcon = faEdit;

  showCourseInfo(id: string) {
    this.onShowCourse.emit(id);
  }

  onEditCourseClick(id: string) {
    this.onEditCourse.emit(id);
  }

  onDeleteCourseClick(id: string) {
    this.onDeleteCourse.emit(id);
  }
}

