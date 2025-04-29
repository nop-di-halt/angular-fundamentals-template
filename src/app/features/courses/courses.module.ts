import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routing = RouterModule.forChild([
  { path: "edit/:id", component: EditCourseComponent, canActivate: [AdminGuard] },
  { path: "add", component: AddCourseComponent, canActivate: [AdminGuard] },
  { path: ":id", component: CourseInfoComponent },
  { path: "", component: CoursesComponent }
]);

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent, CourseInfoComponent, AddCourseComponent, EditCourseComponent],
  imports: [
    CommonModule,
    SharedModule,
    routing
  ]
})
export class CoursesModule { }
