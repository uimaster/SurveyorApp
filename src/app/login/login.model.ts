export interface LoginRequest{
    UserName: string,
    UserPassword: string
}

export interface LoginResponse{
    massage: string,
    Status: number,
    Data:{}
}