export interface User {
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
  listPending: string[];
}

export interface UserId extends User { id: string; }
