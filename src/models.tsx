import { ObjectId } from "bson";

export type WorkoutType = "Upper Body" | "Core" | "Lower Body" | "Cardio";

export interface Exercise {
  name: string;
  sets: Set[];
}

export interface Set {
  difficulty?: string;
  targetReps: number;
  actualReps: number;
}

export interface Workout {
  _id: ObjectId;
  type: WorkoutType;
  date: Date;
  exercises: Exercise[];
}
