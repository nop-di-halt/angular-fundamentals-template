import { ActionReducerMap } from "@ngrx/store";
import { authorsReducer, AuthorsState, coursesReducer, CoursesState } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

export interface State {
    courses: CoursesState,
    authors: AuthorsState
}

export const reducers: ActionReducerMap<State> = {
    courses: coursesReducer,
    authors: authorsReducer
};

export const effects = [
    CoursesEffects
];