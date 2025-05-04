import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { requestAllCourses, requestAllCoursesFail, requestAllCoursesSuccess } from './courses.actions';
import { Course, CoursesResponse } from '@app/shared/interfaces';

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private coursesService: CoursesService) { }

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(requestAllCourses),
        switchMap(() => this.coursesService.getAll().pipe(
            map((courses: CoursesResponse) => requestAllCoursesSuccess({ courses: courses.result as Course[] })),
            catchError(error => of(requestAllCoursesFail({ error: error })))
        ))
    ))
}
