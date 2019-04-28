import { Food } from './food';

export interface User {
  picture: string;
  name: string;
  surname: string;
  type: string;
  dailyCalories: number;
  takenCalories: number;
  exerciseCalories: number;
  remainingCalories: number;
  stepsGoal: number;
  stepCount: number;
  selectedNutritionist: string;
  currentNutritionist: string;
  listFood: Food[];
  feed: string[];
  listAccepted: string[];
  listPending: string[];
}

export interface UserId extends User { id: string; }
