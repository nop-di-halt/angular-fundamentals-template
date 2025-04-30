
export interface User {
    name?: string,
    email: string
}

export interface UserFull extends UserLoginRequest {
    role: string,
    id: string
}

export interface Response {
    successful: boolean,
}

export interface UserResponse extends Response {
    result: UserFull
}
export interface LoginResponse extends Response {
    result: string,
    user: User
}

export interface RegisterResponse extends Response {
    result: string
}

export interface AuthorsResponse extends Response {
    result: Author[] | Author
}

export interface CoursesResponse extends Response {
    result: Course[] | Course | string
}

export interface UserLoginRequest extends User {
    password: string
}

export interface Author extends AuthorRequest {
    id: string
}

export interface CourseRequest {
    title: string,
    description: string,
    creationDate: string,
    duration: number,
    authors: string[],
}

export interface Course extends CourseRequest {
    id: string
}

export interface AuthorRequest {
    name: string
}