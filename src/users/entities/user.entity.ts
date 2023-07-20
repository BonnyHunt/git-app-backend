export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  projects?: Project[];
}
export class Project {
  name: string;
}
