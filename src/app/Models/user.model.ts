export interface User {
  id?: number;
  username: string;
  password: string;
  role: number;
  createdAt?: Date;
  updatedAt?: Date;
}
