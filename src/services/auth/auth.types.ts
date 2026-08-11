export interface RegisterInput {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthUserResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    createdAt: Date;
    token: string;
}
