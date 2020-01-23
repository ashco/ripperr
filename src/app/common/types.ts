import { WorkoutMode, MovementType } from './enums';

// =============== ERRORS ===============
export interface IFormError {
  message: string;
}

export interface IAuthError {
  code: string;
  message: string;
}

// =============== USERS ===============
export interface IUser {
  uid: string;
  email: string;
  username: string;
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

// =============== FORM HELPERS ===============
export interface IHandleChange {
  target: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
}

// =============== FORMS ===============

export interface IExerciseFormValues {
  [key: string]: any;
  name: string;
  description: string;
  tags: string[];
}

export interface IWorkoutFormValues {
  [key: string]: any;
  name: string;
  description: string;
  tags: string[];
  mode: WorkoutMode;
  // movements: IMovementRefReps[] | IMovementRefTimed[];
  movements: IMovementRefs[];
  rest: IWorkoutRest;
  config: IWorkoutConfig;
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
  // movements: IMovementRefReps[] | IMovementRefTimed[];
  movements: IMovementRefs[];
  rest: IWorkoutRest;
  config: IWorkoutConfig;
}

export interface IMovementRefs {
  [key: string]: string | number;
  id: string;
  sets: number;
  reps: number;
  duration: number;
}

// export interface IMovementRefReps extends IMovementRefs {
//   sets: number;
//   reps: number;
//   duration: null;
// }

// export interface IMovementRefTimed extends IMovementRefs {
//   sets: null;
//   reps: null;
//   duration: number;
// }

// export interface IMovementRefs {
//   [key: string]: string | number;
//   id: string;
// }

// export interface IMovementRefReps extends IMovementRefs {
//   sets: number;
//   reps: number;
// }

// export interface IMovementRefTimed extends IMovementRefs {
//   duration: number;
// }

export interface IWorkoutRest {
  [key: string]: boolean | number;
  auto: boolean;
  inner: number;
  outer: number;
}

export interface IWorkoutConfig {
  rounds?: number;
}
