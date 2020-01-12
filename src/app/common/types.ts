export type FormMode = 'Add' | 'Edit';
export type WorkoutMode = '' | 'reps-sets' | 'tabata';

export interface IAuthError {
  code: string;
  message: string;
}

export type AuthErrorSchema = false | IAuthError;

export interface IExercise {
  id: string;
  name: string;
}

export interface IWorkoutFormValues {
  name: string;
  workoutMode: WorkoutMode;
}

export interface IWorkout extends IWorkoutFormValues {
  id: string;
}
