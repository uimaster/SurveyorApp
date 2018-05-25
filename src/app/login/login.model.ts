export interface LoginRequest{
    username: string,
    password: string
}

export interface LoginResponse{
    massage: string,
    result: number,
    SurveyorID: number;
    value:{}
}