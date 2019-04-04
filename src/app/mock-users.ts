import { UserType, User } from './user';

export const USERS: User[] = [
  { id: 0, name: 'John', surname: 'Snow', type: UserType.Client },
  { id: 1, name: 'Daenerys', surname: 'Targaryen', type: UserType.Client },
  { id: 2, name: 'Aemon', surname: 'Targaryen', type: UserType.Nutritionist }
];
