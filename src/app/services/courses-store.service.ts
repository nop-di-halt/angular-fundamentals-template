import { Injectable } from '@angular/core';
import { Course, Author, CourseRequest } from '@app/shared/interfaces';
import { BehaviorSubject, finalize } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[] | Course | string>("");
    private authors$$ = new BehaviorSubject<Author[] | Author>({ id: "", name: "" });

    isLoading$ = this.isLoading$$.asObservable();
    courses$ = this.courses$$.asObservable();
    authors$ = this.authors$$.asObservable();

    constructor(private coursesService: CoursesService) { }

    getAll() {
        this.isLoading$$.next(true);
        this.coursesService.getAll()
            .subscribe(coursesResponse => {
                if (coursesResponse.successful) {
                    this.coursesService.getAllAuthors()
                        .pipe(finalize(() => this.isLoading$$.next(false)))
                        .subscribe(authorsResponse => {
                            if (authorsResponse.successful) {
                                const courses = coursesResponse.result as Course[];
                                courses.forEach(c => c.authors = c.authors.map(id => (authorsResponse.result as Author[]).find(a => a.id == id)?.name || ""));
                                this.courses$$.next(courses);
                            }
                        });
                }

            });
    }

    createCourse(course: CourseRequest) {
        this.isLoading$$.next(true);
        this.coursesService.createCourse(course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.courses$$.next(response.result);
                }
            });
    }

    getCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id)
            .subscribe(response => {
                if (response.successful) {
                    this.coursesService.getAllAuthors()
                        .pipe(finalize(() => this.isLoading$$.next(false)))
                        .subscribe(authorsResponse => {
                            if (authorsResponse.successful) {
                                const course = response.result as Course;
                                course.authors = course.authors.map(id => (authorsResponse.result as Author[]).find(a => a.id == id)?.name || "");
                                this.courses$$.next(course);
                            }
                        });
                }
            });
    }

    editCourse(id: string, course: CourseRequest) {
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.courses$$.next(response.result);
                }
            });
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.courses$$.next(response.result);
                }
            });
    }

    filterCourses(value: string) {
        this.isLoading$$.next(true);
        this.coursesService.filterCourses(value)
            .subscribe(coursesResponse => {
                if (coursesResponse.successful) {
                    this.coursesService.getAllAuthors()
                        .pipe(finalize(() => this.isLoading$$.next(false)))
                        .subscribe(authorsResponse => {
                            if (authorsResponse.successful) {
                                const courses = coursesResponse.result as Course[];
                                courses.forEach(c => c.authors = c.authors.map(id => (authorsResponse.result as Author[]).find(a => a.id == id)?.name || ""));
                                this.courses$$.next(courses);
                            }
                        })
                }

            });
    }

    getAllAuthors() {
        this.isLoading$$.next(true);
        this.coursesService.getAllAuthors()
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.authors$$.next(response.result);
                }
            });
    }


    createAuthor(name: string) {
        this.isLoading$$.next(true);
        this.coursesService.createAuthor({ name: name })
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.authors$$.next(response.result);
                }
            });
    }

    getAuthorById(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.authors$$.next(response.result);
                }
            });
    }
}
