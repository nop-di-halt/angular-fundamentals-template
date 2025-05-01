import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/interfaces';
import { UserStoreService } from '@app/user/services/user-store.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnDestroy {
  private destroyed$ = new Subject<void>();

  constructor(private userStoreService: UserStoreService, private coursesStoreService: CoursesStoreService, private router: Router) { }

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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  showCourseInfo(id: string) {
    this.onShowCourse.emit(id);
  }

  onDeleteCourseClick(id: string) {
    this.coursesStoreService.deleteCourse(id);
    this.coursesStoreService.isProcessing$.pipe(takeUntil(this.destroyed$)).subscribe(isProcessing => {
      if (!isProcessing) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/courses']);
      }
    });
  }
}

