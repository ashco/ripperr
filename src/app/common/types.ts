import {
  WorkoutMode,
  MovementType,
  FormActionType,
  ModalActionType,
} from './enums';

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
  archetypes: Archetype[];
}

export interface IExercisesFirebaseQuery {
  loading: boolean;
  exercises: Exercise[];
}

export interface IWorkoutsFirebaseQuery {
  loading: boolean;
  workouts: Workout[];
}

export interface IMovementState {
  loading: boolean;
  archetypes: Archetype[];
  exercises: Exercise[];
  workouts: Workout[];
}

// =============== FORM HELPERS ===============
export interface IHandleChange {
  target: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
}

// =============== STATES ===============
// export interface ArchetypeFormState {
//   [key: string]: any;
//   name: string;
//   description: string;
// }
// =============== DATA OBJECT STRUCTURES ===============
export type Movement = Archetype | Exercise | Workout;

export interface Archetype {
  readonly type: MovementType;
  readonly id?: string;
  lastModified?: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  name: string;
  description: string;
  history?: any;
}

export interface Exercise extends Archetype {
  tags: string[];
}

export interface Workout extends Exercise {
  mode: WorkoutMode;
  movements: IMovementRefs[];
  rest: IWorkoutRest;
  config: IWorkoutConfig;
}

// ==================== FORM STATES ====================
// export type MovementFormState =
//   | ArchetypeFormState
//   | ExerciseFormState
//   | WorkoutFormState;

// export interface ArchetypeFormState {
//   [key: string]: any;
//   readonly type: MovementType;
//   name: string;
//   description: string;
// }

// export interface ExerciseFormState extends ArchetypeFormState {
//   tags: string[];
// }

// export interface WorkoutFormState extends ExerciseFormState {
//   mode: WorkoutMode;
//   movements: IMovementRefs[];
//   rest: IWorkoutRest;
//   config: IWorkoutConfig;
// }

export interface IArchetypeFormErrors {
  name: string;
  description: string;
}
// export interface ExerciseFormState {
//   [key: string]: any;
//   name: string;
//   description: string;
//   tags: string[];
// }
export interface IExerciseFormErrors {
  name: string;
  description: string;
  tags: string;
}

// export interface WorkoutFormState {
//   [key: string]: any;
//   name: string;
//   description: string;
//   tags: string[];
//   mode: WorkoutMode;
//   // movements: IMovementRefReps[] | IMovementRefTimed[];
//   movements: IMovementRefs[];
//   rest: IWorkoutRest;
//   config: IWorkoutConfig;
// }

export interface IWorkoutFormErrors {
  name: string;
  description: string;
  tags: string;
}

// =============== FORM BUTTONS ===============

export interface ButtonRowCancelBtn {
  text: string;
  onClick: () => void;
}
export interface ButtonRowActionBtn {
  text: string;
  onClick?: () => void;
  // submit: boolean;
}
// export interface IButtonRow {
//   cancelBtn: IButtonRowBtn;
//   actionBtn: IButtonRowBtn;
// }

export interface ButtonRowProps {
  cancelBtn: ButtonRowCancelBtn;
  actionBtn: ButtonRowActionBtn;
}

// export interface Archetype {
//   readonly id: string;
//   lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
//   readonly type: MovementType;
//   name: string;
//   description: string;
//   history: any;
// }

// export interface Exercise {
//   readonly id: string;
//   lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
//   readonly type: MovementType;
//   name: string;
//   description: string;
//   history: any;
//   tags: string[];
// }

// export interface Workout {
//   readonly id: string;
//   lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
//   readonly type: MovementType;
//   name: string;
//   description: string;
//   tags: string[];
//   history: any;
//   mode: WorkoutMode;
//   // movements: IMovementRefReps[] | IMovementRefTimed[];
//   movements: IMovementRefs[];
//   rest: IWorkoutRest;
//   config: IWorkoutConfig;
// }

export interface IMovementRefs {
  [key: string]: string | number;
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration: number;
}

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
