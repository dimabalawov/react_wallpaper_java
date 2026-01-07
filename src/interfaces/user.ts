export interface User {
  id: string;
  username: string;
  email: string;
  token?: string; // Assuming the backend returns a JWT or similar token
}

export interface AuthResponse {
  user: User;
  token: string;
}
