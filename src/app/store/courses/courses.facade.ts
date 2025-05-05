import { Injectable } from '@angular/core';
import { State } from '..';
import { Store } from '@ngrx/store';
import { getAllAuthors, getAllCourses, getCourse, getCourses, getErrorMessage, isAllCoursesLoadingSelector, isSearchingStateSelector, isSingleCourseLoadingSelector } from './courses.selectors';
import { requestAllAuthors, requestAllCourses, requestCreateCourse, requestDeleteCourse, requestEditCourse, requestFilteredCourses, requestSingleCourse } from './courses.actions';
import { Course } from '@app/shared/interfaces';

@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    isAllCoursesLoading$ = this.store.select(isAllCoursesLoadingSelector);
    isSingleCourseLoading$ = this.store.select(isSingleCourseLoadingSelector);
    isSearchingState$ = this.store.select(isSearchingStateSelector);
    courses$ = this.store.select(getCourses);
    allCourses$ = this.store.select(getAllCourses);
    course$ = this.store.select(getCourse);
    errorMessage$ = this.store.select(getErrorMessage);
    allAuthors$ = this.store.select(getAllAuthors);

    constructor(private store: Store<State>) { }

    getAllCourses(): void {
        this.store.dispatch(requestAllCourses());
    }

    getAllAuthors(): void {
        this.store.dispatch(requestAllAuthors());
    }
    getSingleCourse(id: string): void {
        this.store.dispatch(requestSingleCourse({ id: id }));
    }

    editCourse(id: string, body: Course): void {
        this.store.dispatch(requestEditCourse({ id: id, course: body }));
    }

    createCourse(body: Course): void {
        this.store.dispatch(requestCreateCourse({ course: body }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(requestDeleteCourse({ id: id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(requestFilteredCourses({ title: searchValue }));
    }
}
