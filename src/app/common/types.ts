export type FormMode = 'Add' | 'Edit';

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
  type: '' | 'reps-sets' | 'circuit';
}

export interface IWorkout extends IWorkoutFormValues {
  id: string;
}
