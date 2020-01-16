﻿import { WorkoutMode } from './enums';

// =============== TYPES ===============

// export type FormMode = 'Add' | 'Edit';
// export type WorkoutModeLabel = '' | 'Reps + Sets' | 'Tabata' | 'Circuit';
// export type WorkoutMode = '' | 'reps-sets' | 'tabata' | 'circuit';
// export type AuthErrorSchema = false | IAuthError;

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
  mode: WorkoutMode;
  exercises: IWorkoutExerciseRepsSets[];
}

// =============== DATA OBJECT STRUCTURES ===============
export interface IWorkout {
  readonly id: string;
  name: string;
  notes: string;
  tags: string[];
  history: any;
  mode: WorkoutMode;
  movements: IMovementRefs[];
  rest: IWorkoutRest;
  config: any;
}

export interface IExercise {
  readonly id: string;
  name: string;
  notes: string;
  tags: string[];
  history: any;
}

interface IMovementRefs {
  id: string;
  config: any;
}

interface IWorkoutRest {
  automatic: boolean;
  inner: number;
  outer: number;
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
// export interface IWorkoutModeOption {
//   label: WorkoutModeLabel;
//   value: WorkoutModeValue;
// }

// export interface IMovement {
//   id: string;
//   type: MovementTypes;
//   name: string;
//   notes: string;
//   tags: string[];
//   mode: WorkoutModeTypes | null;
//   movements: IMovementRefs[] | null;
//   rest: IMovementRest | null;
//   config: MovementConfig | null;
//   history: null;
// }

// type MovementTypes = 'workout' | 'exercise';
// // type WorkoutModeTypes = 'reps-sets' | 'circuit' | 'chaining';
// type WorkoutModeTypes = 'reps' | 'timed' | 'wo-group';
// // // type ExerciseModeTypes = 'manual' | 'timed';

// type timedWorkoutModes = 'timed' | 'circuit' | 'tabata' | 'follow-along';

// type MovementConfig =
//   | IMovementConfigRepsSetsEx
//   | IMovementConfigRepsSetsWo
//   | IMovementConfigCircuitEx
//   | IMovementConfigCircuitWo;

// interface IMovementConfigRepsSetsEx {
//   reps: number;
//   sets: number;
// }
// interface IMovementConfigRepsSetsWo {
//   reps: number;
//   sets: number;
// }

// interface IMovementConfigCircuitEx {
//   interval: number;
// }

// interface IMovementConfigCircuitWo {
//   rounds: number;
// }
