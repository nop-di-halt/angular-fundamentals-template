import { Author, Course } from '@app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './courses.actions';
import { state } from '@angular/animations';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: Course[],
    course: Course| null,
    isAllCoursesLoading: boolean,
    isSingleCourseLoading: boolean,
    isSearchState: boolean,
    errorMessage: string | null
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null
};

export interface AuthorsState {
    allAuthors: Author[],
    isAllAuthorsLoading: boolean,
    errorMessage: string | null
}

export const authorsInitialState: AuthorsState = {
    allAuthors: [],
    isAllAuthorsLoading: false,
    errorMessage: null
}

export const coursesReducer = createReducer(
    initialState,
    on(actions.requestAllCourses, state => ({ ...state, isAllCoursesLoading: true })),
    on(actions.requestAllCoursesSuccess, (state, { courses }) => ({ ...state, allCourses: courses, isAllCoursesLoading: false })),
    on(actions.requestAllCoursesFail, (state, { error }) => ({ ...state, errorMessage: error, isAllCoursesLoading: false })),
    on(actions.requestSingleCourse, state => ({ ...state, isSingleCourseLoading: true })),
    on(actions.requestSingleCourseSuccess, (state, { course }) => ({ ...state, isSingleCourseLoading: false, course: course })),
    on(actions.requestSingleCourseFail, (state, { error }) => ({ ...state, isSingleCourseLoading: false, errorMessage: error })),
    on(actions.requestFilteredCourses, state => ({ ...state, isSearchState: true })),
    on(actions.requestFilteredCoursesSuccess, (state, { courses }) => ({ ...state, allCourses: courses, isSearchState: false })),
    on(actions.requestFilteredCoursesFail, (state, { error }) => ({ ...state, isSearchState: false, errorMessage: error })),
    on(actions.requestDeleteCourse, state => ({ ...state })),
    on(actions.requestDeleteCourseFail, (state, { error }) => ({ ...state, errorMessage: error })),
    on(actions.requestEditCourse, (state, { course }) => ({ ...state, course: course })),
    on(actions.requestEditCourseSuccess, (state, { course }) => ({ ...state, course: course })),
    on(actions.requestEditCourseFail, (state, { error }) => ({ ...state, errorMessage: error })),
    on(actions.requestCreateCourse, (state, { course }) => ({ ...state, course: course })),
    on(actions.requestCreateCourseSuccess, (state, { course }) => ({ ...state, course: course })),
    on(actions.requestCreateCourseFail, (state, { error }) => ({ ...state, errorMessage: error }))
);

export const authorsReducer = createReducer(
    authorsInitialState,
    on(actions.requestAllAuthors, state => ({ ...state, isAllAuthorsLoading: true })),
    on(actions.requestAllAuthorsSuccess, (state, { authors }) => ({ ...state, allAuthors: authors, isAllAuthorsLoading: false })),
    on(actions.requestAllAuthorsFail, (state, { error }) => ({ ...state, isAllAuthorsLoading: false, errorMessage: error }))
)
;
export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
