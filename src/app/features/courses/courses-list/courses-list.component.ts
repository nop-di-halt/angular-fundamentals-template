import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/shared/interfaces';
import { State } from '@app/store';
import { requestDeleteCourse } from '@app/store/courses/courses.actions';
import { UserStoreService } from '@app/user/services/user-store.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  private destroyed$ = new Subject<void>();

  constructor(private userStoreService: UserStoreService, private store: Store<State>) { }

  get isAdmin() {
    return this.userStoreService.isAdmin;
  }

  @Input()
  courses!: Course[] | null;

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

  onDeleteCourseClick(id: string) {
    this.store.dispatch(requestDeleteCourse({ id: id }));
  }
}

