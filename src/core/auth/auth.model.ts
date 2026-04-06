export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  refresh_token_expiration: number;
}
