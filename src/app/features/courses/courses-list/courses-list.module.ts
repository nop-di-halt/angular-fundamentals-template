import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CoursesListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[CoursesListComponent]
})
export class CoursesListModule { }
