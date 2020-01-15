// =============== TYPES ===============

export type FormMode = 'Add' | 'Edit';
export type WorkoutModeLabel = '' | 'Reps + Sets' | 'Tabata' | 'Circuit';
export type WorkoutModeValue = '' | 'reps-sets' | 'tabata' | 'circuit';
export type AuthErrorSchema = false | IAuthError;

// =============== ERRORS ===============
export interface IFormError {
  message: string;
}

export interface IAuthError {
  code: string;
  message: string;
}

// =============== FIREBASE QUERIES ===============

export interface IExercisesFirebaseQuery {
  exLoading: boolean;
  exercises: IExercise[];
}

export interface IWorkoutsFirebaseQuery {
  woLoading: boolean;
  workouts: IWorkout[];
}

// =============== FORMS ===============
export interface IExerciseFormValues {
  [key: string]: any;
  name: string;
}

export interface IWorkoutFormValues {
  [key: string]: any;
  name: string;
  mode: WorkoutModeValue;
  exercises: IWorkoutExerciseRepsSets[];
}

// =============== DATA OBJECT STRUCTURES ===============
export interface IWorkout extends IWorkoutFormValues {
  woId: string;
}

export interface IExercise {
  exId: string;
  name: string;
}

interface IWorkoutExercise {
  [key: string]: any;
  exId: string;
}

export interface IWorkoutExerciseRepsSets extends IWorkoutExercise {
  sets: number;
  reps: number;
}

// export interface IWorkoutExerciseCircuit extends IWorkoutExercise {
//   rounds: ;
// }

// export interface IWorkoutExerciseTabata extends IWorkoutExercise {
//   rounds: number;
// }

// =============== MISC ===============
export interface IWorkoutModeOption {
  label: WorkoutModeLabel;
  value: WorkoutModeValue;
}

export interface IMovement {
  id: string;
  type: MovementTypes;
  name: string;
  notes: string;
  mode: WorkoutModeTypes | null;
  movements: IMovement[] | null;
  rest: IMovementRest | null;
  config:
    | IMovementConfigRepsSetsEx
    | IMovementConfigRepsSetsWo
    | IMovementConfigCircuitEx
    | IMovementConfigCircuitWo
    | null;
}

type MovementTypes = 'workout' | 'exercise';
type WorkoutModeTypes = 'reps-sets' | 'circuit' | 'chaining';
// // type ExerciseModeTypes = 'manual' | 'timed';

interface IMovementRest {
  automatic: boolean;
  inner: number | null;
  outer: number;
}

interface IMovementConfigRepsSetsEx {
  reps: number;
  sets: number;
}
interface IMovementConfigRepsSetsWo {
  reps: number;
  sets: number;
}

interface IMovementConfigCircuitEx {
  interval: number;
}

interface IMovementConfigCircuitWo {
  rounds: number;
}
