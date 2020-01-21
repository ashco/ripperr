import { WorkoutMode, MovementType } from './enums';

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
export type IAuthUserContext = firebase.User | null;

export interface IExercisesFirebaseQuery {
  loading: boolean;
  exercises: IExercise[];
}

export interface IWorkoutsFirebaseQuery {
  loading: boolean;
  workouts: IWorkout[];
}

export interface IMovementState {
  loading: boolean;
  exercises: IExercise[];
  workouts: IWorkout[];
}

// =============== FORMS ===============
export interface IExerciseFormValues {
  [key: string]: any;
  name: string;
  description: string;
  tags: string[];
}

// export interface IWorkoutFormValues {
//   [key: string]: any;
//   name: string;
//   description: string;
//   tags: string[];
//   mode: WorkoutMode;
//   movements: IMovementRefs<IMovementRefRepsConfig | IMovementRefTimedConfig>[];
//   restAuto: boolean;
//   restInner: number;
//   restOuter: number;
//   config: any;
// }
export interface IWorkoutFormValues {
  [key: string]: any;
  name: string;
  description: string;
  tags: string[];
  mode: WorkoutMode;
  movements: IMovementRefs<IMovementRefRepsConfig | IMovementRefTimedConfig>[];
  rest: IWorkoutRest;
  config: any;
}

// =============== DATA OBJECT STRUCTURES ===============

export interface IExercise {
  readonly id: string;
  lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  readonly type: MovementType;
  name: string;
  description: string;
  tags: string[];
  history: any;
}

export interface IWorkout {
  readonly id: string;
  lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  readonly type: MovementType;
  name: string;
  description: string;
  tags: string[];
  history: any;
  mode: WorkoutMode;
  movements: IMovementRefs<IMovementRefRepsConfig | IMovementRefTimedConfig>[];
  rest: IWorkoutRest;
  config: any;
}

export interface IMovementRefs<T> {
  [key: string]: any;
  id: string;
  config: T; // IMovementRefRepsConfig | IMovementRefTimedConfig;
}

export interface IMovementRefRepsConfig {
  [key: string]: number;
  sets: number;
  reps: number;
}

export interface IMovementRefTimedConfig {
  [key: string]: number;
  duration: number;
}

export interface IWorkoutRest {
  [key: string]: boolean | number;
  auto: boolean;
  inner: number;
  outer: number;
}

// interface IWorkoutExercise {
//   [key: string]: any;
//   id: string;
// }

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
//   description: string;
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
//   duration: number;
// }

// interface IMovementConfigCircuitWo {
//   rounds: number;
// }
