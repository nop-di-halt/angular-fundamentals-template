import { createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import { State } from "..";


export const selectCourses = (state: State) => state.courses;
export const getAllCourses = createSelector(selectCourses, (state: CoursesState) => state.allCourses);
