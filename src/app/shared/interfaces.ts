
export interface User {
    name?: string,
    email: string
}

export interface UserLogin extends User {
    password: string
}

export interface LoginResponse {
    successful: boolean,
    result: string,
    user: User
}

export interface RegisterResponse {
    successful: boolean,
    result: string
}

export interface CourseRequest {
    title: string,
    description: string,
    creationDate: string,
    duration: number,
    authors: string[],
}

export interface CourseResponse {
    successful: boolean,
    result: Course
}

export interface Course extends CourseRequest {
    id: string
}

export interface AuthorRequest {
    name: string
}

export interface Author extends AuthorRequest {
    id: string
}

export interface AuthorResponse {
    successful: boolean,
    result: Author
}

export interface AuthorsResponse {
    successful: boolean,
    result: Author[]
}

export interface CoursesResponse {
    successful: boolean,
    result: Course[]
}