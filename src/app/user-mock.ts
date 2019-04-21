import { FoodMock } from './food-mock';

export enum UserType { Client, Nutritionist }

export class UserMock {
  id: number;
  name: string;
  surname: string;
  type: UserType;
  dailyCalories: number;
  takenCalories: number;
  exerciseCalories: number;
  remainingCalories: number;
  stepsGoal: number;
  stepCount: number;
  listFood: FoodMock[];
  listAccepted: number[];
  listPending: number[];
}
