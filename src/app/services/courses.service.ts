import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '@app/shared/api';
import { AuthorRequest, AuthorResponse, AuthorsResponse, Course, CourseRequest, CoursesResponse } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private apiUrl = apiUrl;

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<CoursesResponse> {
        return this.httpClient.get<CoursesResponse>(`${this.apiUrl}/courses/all`);
    }

    createCourse(course: CourseRequest) {
        this.httpClient.post<CourseRequest>(`${this.apiUrl}/courses/add`, course);
    }

    editCourse(id: string, course: CourseRequest) {
        this.httpClient.put<CourseRequest>(`${this.apiUrl}/courses/${id}`, course);
    }

    getCourse(id: string): Observable<CoursesResponse> {
        return this.httpClient.get<CoursesResponse>(`${this.apiUrl}/courses/${id}`);
    }

    deleteCourse(id: string) {
        this.httpClient.delete(`${this.apiUrl}/courses/${id}`);
    }

    filterCourses(value: string): Observable<CoursesResponse> {
        return this.httpClient.get<CoursesResponse>(`${this.apiUrl}/courses/filter?${value}`);
    }

    getAllAuthors(): Observable<AuthorsResponse> {
        return this.httpClient.get<AuthorsResponse>(`${this.apiUrl}/authors/all`);
    }

    createAuthor(author: AuthorRequest) {
        this.httpClient.post<AuthorRequest>(`${this.apiUrl}/authors/add`, author);
    }

    getAuthorById(id: string): Observable<AuthorResponse> {
        return this.httpClient.get<AuthorResponse>(`${this.apiUrl}/authors/${id}`);
    }
}
