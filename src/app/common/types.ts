export type FormMode = 'Add' | 'Edit';
export type WorkoutMode = '' | 'reps-sets' | 'tabata';

export interface IAuthError {
  code: string;
  message: string;
}

export type AuthErrorSchema = false | IAuthError;

// how individual exercise data is structured
export interface IExercise {
  exId: string;
  name: string;
}

export interface IExerciseState {
  exLoading: boolean;
  exercises: IExercise[];
}

export interface IWorkoutsState {
  woLoading: boolean;
  workouts: IWorkout[];
}

// How exercise data object in workout data object is structured
interface IWorkoutExercise {
  [key: string]: any;
  exId: string;
  sets: string;
  reps: string;
}

// what to expect from workout form
export interface IWorkoutFormValues {
  [key: string]: any;
  name: string;
  mode: WorkoutMode;
  exercises: IWorkoutExercise[];
}

// workout data structure. This object is what goes into trainer mode
export interface IWorkout extends IWorkoutFormValues {
  woId: string;
}
