import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '@app/shared/api';
import { AuthorRequest,  AuthorsResponse, Course, CourseRequest, CoursesResponse } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<CoursesResponse> {
        return this.httpClient.get<CoursesResponse>(`${apiUrl}/courses/all`);
    }

    createCourse(course: CourseRequest): Observable<CoursesResponse> {
        return this.httpClient.post<CoursesResponse>(`${apiUrl}/courses/add`, course);
    }

    editCourse(id: string, course: CourseRequest): Observable<CoursesResponse> {
        return this.httpClient.put<CoursesResponse>(`${apiUrl}/courses/${id}`, course);
    }

    getCourse(id: string): Observable<CoursesResponse> {
        return this.httpClient.get<CoursesResponse>(`${apiUrl}/courses/${id}`);
    }

    deleteCourse(id: string): Observable<CoursesResponse> {
        return this.httpClient.delete<CoursesResponse>(`${apiUrl}/courses/${id}`);
    }

    filterCourses(value: string): Observable<CoursesResponse> {
        return this.httpClient.get<CoursesResponse>(`${apiUrl}/courses/filter?${value}`);
    }

    getAllAuthors(): Observable<AuthorsResponse> {
        return this.httpClient.get<AuthorsResponse>(`${apiUrl}/authors/all`);
    }

    createAuthor(author: AuthorRequest): Observable<AuthorsResponse> {
        return this.httpClient.post<AuthorsResponse>(`${apiUrl}/authors/add`, author);
    }

    getAuthorById(id: string): Observable<AuthorsResponse> {
        return this.httpClient.get<AuthorsResponse>(`${apiUrl}/authors/${id}`);
    }
}
