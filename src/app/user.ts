import { Food } from './food';

export enum UserType { Client, Nutritionist }

export class User {
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
  listFood: Food[];
  listAccepted: number[];
  listPending: number[];
}
