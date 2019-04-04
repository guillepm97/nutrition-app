export enum UserType { Client, Nutritionist }

export class User {
  id: number;
  name: string;
  surname: string;
  type: UserType;
}
