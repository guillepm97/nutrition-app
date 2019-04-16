import { UserType, User } from './user';

export const USERS: User[] = [
  { id: 0, name: 'John', surname: 'Snow', type: UserType.Client,
    dailyCalories: 2450, takenCalories: 0, exerciseCalories: 0,
    remainingCalories: 2450, listFood: [] },
  { id: 1, name: 'Daenerys', surname: 'Targaryen', type: UserType.Client,
    dailyCalories: 2200, takenCalories:0, exerciseCalories: 0,
    remainingCalories: 2450, listFood: [] },
  { id: 2, name: 'Aemon', surname: 'Targaryen', type: UserType.Nutritionist,
    dailyCalories: 0, takenCalories: 0, exerciseCalories: 0,
    remainingCalories: 0, listFood: [] }
];
