
export class LoginRequest {
  id?: string;
  UserName?: string;
  UserPassword?: string;
  token?: string;
}


export interface LoginResponse {
    Message: string;
    Status: string;
    Data: {};
}
