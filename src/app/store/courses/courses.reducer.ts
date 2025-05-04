import { Course } from '@app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './courses.actions';

export interface CoursesState {
    allCourses: Course[],
    course: Course | null,
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

export const coursesReducer = createReducer(
    initialState,
    on(actions.requestAllCourses, state => ({ ...state, isAllCoursesLoading: true })),
    on(actions.requestAllCoursesSuccess, (state, { courses }) => ({ ...state, allCourses: courses, isAllCoursesLoading: false })),
    on(actions.requestAllCoursesFail, (state, { error }) => ({ ...state, errorMessage: error, isAllCoursesLoading: false }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
