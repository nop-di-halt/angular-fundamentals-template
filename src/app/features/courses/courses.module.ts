import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AdminGuard } from '@app/user/guards/admin.guard';
import { CoursesListModule } from './courses-list/courses-list.module';
import { RefreshComponent } from './refresh/refresh.component';

const routing = RouterModule.forChild([
  { path: "edit/:id", component: EditCourseComponent, canActivate: [AdminGuard] },
  { path: "refresh", component: RefreshComponent },
  { path: "add", component: AddCourseComponent, canActivate: [AdminGuard] },
  { path: ":id", component: CourseInfoComponent },
  { path: "", component: CoursesComponent }
]);

@NgModule({
  declarations: [CoursesComponent, CourseInfoComponent, AddCourseComponent, EditCourseComponent, RefreshComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesListModule,
    routing
  ]
})
export class CoursesModule { }
