import {
  WorkoutMode,
  MovementType,
  FormActionType,
  ModalActionType,
} from './enums';

export type IMovements = IArchetype | IExercise | IWorkout;
export type IMovementFormState =
  | ArchetypeFormState
  | ExerciseFormState
  | IWorkoutFormState;

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

export interface IArchetypesFirebaseQuery {
  loading: boolean;
  archetypes: IArchetype[];
}

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
  archetypes: IArchetype[];
  exercises: IExercise[];
  workouts: IWorkout[];
}

// =============== FORM HELPERS ===============
export interface IHandleChange {
  target: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
}

// =============== STATES ===============
export interface ArchetypeFormState {
  [key: string]: any;
  name: string;
  description: string;
}
export interface IArchetypeFormErrors {
  name: string;
  description: string;
}
export interface ExerciseFormState {
  [key: string]: any;
  name: string;
  description: string;
  tags: string[];
}
export interface IExerciseFormErrors {
  name: string;
  description: string;
  tags: string;
}

export interface IWorkoutFormState {
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

export interface IWorkoutFormErrors {
  name: string;
  description: string;
  tags: string;
}

export interface IModalState {
  open: boolean;
}

// =============== FORM BUTTONS ===============

export interface IButtonRowBtn {
  text: string;
  onClick?: () => void;
}
export interface IButtonRow {
  cancelBtn: IButtonRowBtn;
  actionBtn: IButtonRowBtn;
}

// =============== DATA OBJECT STRUCTURES ===============

export interface IArchetype {
  readonly id: string;
  lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  readonly type: MovementType;
  name: string;
  description: string;
  history: any;
}

export interface IExercise {
  readonly id: string;
  lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  readonly type: MovementType;
  name: string;
  description: string;
  history: any;
  tags: string[];
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
  name: string;
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

// ============ REDUCERS ============
export interface IFormReducerAction {
  type: FormActionType;
  value: string;
}

// export interface IModalReducerAction {
//   type: ModalActionType;
// }
