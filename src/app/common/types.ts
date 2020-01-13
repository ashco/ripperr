export type FormMode = 'Add' | 'Edit';
export type WorkoutMode = '' | 'reps-sets' | 'tabata';

export interface IAuthError {
  code: string;
  message: string;
}

export type AuthErrorSchema = false | IAuthError;

// how individual exercise data is structured
export interface IExercise {
  exerciseId: string;
  name: string;
}

// How exercise data object in workout data object is structured
interface IWorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
}

// what to expect from workout form
export interface IWorkoutFormValues {
  [key: string]: any;
  name: string;
  mode: WorkoutMode;
  exercises?: IWorkoutExercise[];
}

// workout data structure. This object is what goes into trainer mode
export interface IWorkout extends IWorkoutFormValues {
  workoutId: string;
}
