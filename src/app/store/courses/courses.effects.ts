import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, map, of, switchMap, from, withLatestFrom } from 'rxjs';
import * as a from './courses.actions';
import { Author, Course } from '@app/shared/interfaces';
import { Router } from '@angular/router';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private coursesService: CoursesService, private router: Router, private facade: CoursesStateFacade) { }

    getAll$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestAllCourses),
        switchMap(() => combineLatest([this.coursesService.getAll(), this.coursesService.getAllAuthors()]).pipe(
            map(([coursesResponse, authorsResponse]) => {
                const courses = coursesResponse.result as Course[];
                const authors = authorsResponse.result as Author[];
                courses.forEach(c => { c.authors = c.authors.map(id => authors.find(a => a.id == id)?.name) as string[]; });
                return a.requestAllCoursesSuccess({ courses: courses });
            }
            ),
            catchError(error => of(a.requestAllCoursesFail({ error: error })))
        ))));

    getSpecificCourse$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestSingleCourse),
        switchMap((value) => combineLatest([this.coursesService.getCourse(value.id), this.coursesService.getAllAuthors()]).pipe(
            map(([coursesResponse, authorsResponse]) => {
                const course = coursesResponse.result as Course;
                const authors = authorsResponse.result as Author[];
                course.authors = course.authors.map(id => authors.find(a => a.id == id)?.name) as string[];
                return a.requestSingleCourseSuccess({ course: course });
            }
            ),
            catchError(error => of(a.requestSingleCourseFail({ error: error }))))
        )));

    deleteCourse$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestDeleteCourse),
        switchMap((value) => this.coursesService.deleteCourse(value.id).pipe(
            map(() => a.requestAllCourses()),
            catchError(error => of(a.requestDeleteCourseFail({ error: error })))
        )
        )));

    editCourse$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestEditCourse),
        switchMap((value) => this.coursesService.editCourse(value.id, value.course).pipe(
            map(course => a.requestEditCourseSuccess({ course: course.result as Course })),
            catchError(error => of(a.requestEditCourseFail({ error: error })))
        ))
    ));

    createCourse$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestCreateCourse),
        switchMap((value) => this.coursesService.createCourse(value.course).pipe(
            map(course => a.requestCreateCourseSuccess({ course: course.result as Course })),
            catchError(error => of(a.requestCreateCourseFail({ error: error })))
        ))
    ));

    getAllAuthors$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestAllAuthors),
        switchMap(() => this.coursesService.getAllAuthors().pipe(
            map(response => a.requestAllAuthorsSuccess({ authors: response.result as Author[] })),
            catchError(error => of(a.requestAllAuthorsFail({ error: error })))
        ))
    ));

    redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestCreateCourseSuccess, a.requestEditCourseSuccess, a.requestSingleCourseFail),
        switchMap(() => from(this.router.navigate(["/courses"])))
    ),
        { dispatch: false });

    filteredCourses$ = createEffect(() => this.actions$.pipe(
        ofType(a.requestFilteredCourses),
        withLatestFrom(this.facade.allCourses$),
        map(([value, courses]) => a.requestFilteredCoursesSuccess({ courses: courses.filter(c => c.title == value.title) }))
    ));
}
