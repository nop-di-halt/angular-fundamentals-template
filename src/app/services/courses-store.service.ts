import { Injectable } from '@angular/core';
import { Course, Author, CourseRequest } from '@app/shared/interfaces';
import { BehaviorSubject, finalize } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[]>([]);
    private result$$ = new BehaviorSubject<Course | Author | string>("");
    private authors$$ = new BehaviorSubject<Author[]>([]);

    isLoading$ = this.isLoading$$.asObservable();
    courses$ = this.courses$$.asObservable();
    authors$ = this.authors$$.asObservable();
    result$ = this.result$$.asObservable();


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
                    this.result$$.next(response.result as Course);
                }
            });
    }

    getCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getCourse(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.result$$.next(response.result as Course);
                }
            });
    }

    editCourse(id: string, course: CourseRequest) {
        this.isLoading$$.next(true);
        this.coursesService.editCourse(id, course)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.result$$.next(response.result as Course);
                }
            });
    }

    deleteCourse(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.deleteCourse(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.result$$.next(response.result as string);
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
                    this.authors$$.next(response.result as Author[]);
                }
            });
    }


    createAuthor(name: string) {
        this.isLoading$$.next(true);
        this.coursesService.createAuthor({ name: name })
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.result$$.next(response.result as Author);
                }
            });
    }

    getAuthorById(id: string) {
        this.isLoading$$.next(true);
        this.coursesService.getAuthorById(id)
            .pipe(finalize(() => this.isLoading$$.next(false)))
            .subscribe(response => {
                if (response.successful) {
                    this.result$$.next(response.result as Author);
                }
            });
    }
}
