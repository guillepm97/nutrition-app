import { UserType, User } from './user';

export const USERS: User[] = [
  { id: 0, name: 'John', surname: 'Snow', type: UserType.Client,
    dailyCalories: 2450, takenCalories: 0, exerciseCalories: 0,
    remainingCalories: 2450, stepsGoal: 10000, stepCount: 0, listFood: [],
    listAccepted: [], listPending: [] },
  { id: 1, name: 'Daenerys', surname: 'Targaryen', type: UserType.Client,
    dailyCalories: 2200, takenCalories:0, exerciseCalories: 0,
    remainingCalories: 2450, stepsGoal: 10000, stepCount: 0, listFood: [],
    listAccepted: [], listPending: [] },
  { id: 2, name: 'Aemon', surname: 'Targaryen', type: UserType.Nutritionist,
    dailyCalories: 0, takenCalories: 0, exerciseCalories: 0,
    remainingCalories: 0, stepsGoal: 0, stepCount: 0, listFood: [],
    listAccepted: [0], listPending: [1] }
];
