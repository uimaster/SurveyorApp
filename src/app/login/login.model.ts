export interface LoginRequest{
    UserName: string,
    UserPassword: string
}

export interface LoginResponse{
    Message: string,
    Status: number,
    Data:{}
}