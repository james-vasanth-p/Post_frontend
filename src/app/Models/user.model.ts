export interface User {
  id?: number;
  userName?: string;
  email: string;
  password: string;
}

export interface LoggedInUserData {
  loggedInUserName: string;
  loggedInUserEmail: string;
}
