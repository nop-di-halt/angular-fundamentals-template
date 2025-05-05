import { createSelector } from "@ngrx/store";
import { AuthorsState, CoursesState } from "./courses.reducer";
import { State } from "..";


export const selectCourses = (state: State) => state.courses;
export const selectAuthors = (state: State) => state.authors;
export const getAllCourses = createSelector(selectCourses, (state: CoursesState) => state.allCourses);
export const getCourse = createSelector(selectCourses, (state: CoursesState) => state.course);
export const getCourses = createSelector(selectCourses, (state: CoursesState) => state.allCourses);
export const getErrorMessage = createSelector(selectCourses, (state: CoursesState) => state.errorMessage);
export const isAllCoursesLoadingSelector = createSelector(selectCourses, (state: CoursesState) => state.isAllCoursesLoading);
export const isSearchingStateSelector = createSelector(selectCourses, (state: CoursesState) => state.isSearchState);
export const isSingleCourseLoadingSelector = createSelector(selectCourses, (state: CoursesState) => state.isSingleCourseLoading);
export const getAllAuthors = createSelector(selectAuthors, (state: AuthorsState) => state.allAuthors);
