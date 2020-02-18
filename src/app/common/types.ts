import {
  WorkoutMode,
  MovementType,
  FormActionType,
  ModalActionType,
} from './enums';

export type Movement = Archetype | Exercise | Workout;
export type MovementFormState =
  | ArchetypeFormState
  | ExerciseFormState
  | WorkoutFormState;

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
export interface ArchetypeFormState {
  [key: string]: any;
  readonly type: MovementType;
  name: string;
  description: string;
}

export interface ExerciseFormState extends ArchetypeFormState {
  tags: string[];
}

export interface WorkoutFormState extends ExerciseFormState {
  mode: WorkoutMode;
  movements: IMovementRefs[];
  rest: IWorkoutRest;
  config: IWorkoutConfig;
}

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

export interface ButtonRowBtn {
  text: string;
  onClick?: () => void;
}
// export interface IButtonRow {
//   cancelBtn: IButtonRowBtn;
//   actionBtn: IButtonRowBtn;
// }

export interface ButtonRowProps {
  cancelBtn: ButtonRowBtn;
  actionBtn: ButtonRowBtn;
}

// =============== DATA OBJECT STRUCTURES ===============

export interface Archetype {
  readonly id: string;
  lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  readonly type: MovementType;
  name: string;
  description: string;
  history: any;
}

export interface Exercise extends Archetype {
  tags: string[];
}

export interface Workout extends Exercise {
  history: any;
  mode: WorkoutMode;
  movements: IMovementRefs[];
  rest: IWorkoutRest;
  config: IWorkoutConfig;
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
