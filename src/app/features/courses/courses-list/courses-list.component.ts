import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/shared/interfaces';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  constructor(private userStoreService: UserStoreService, private facade: CoursesStateFacade) { }

  get isAdmin() {
    return this.userStoreService.isAdmin;
  }

  @Input()
  courses!: Course[] | null;

  @Input()
  editable: boolean = true;

  @Output()
  onDeleteCourse = new EventEmitter<string>();

  deleteIcon = faTrash;
  editIcon = faEdit;

  onDeleteCourseClick(id: string) {
    this.facade.deleteCourse(id);
  }
}

