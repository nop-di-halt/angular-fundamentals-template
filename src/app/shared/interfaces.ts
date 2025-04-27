
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