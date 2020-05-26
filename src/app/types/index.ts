// =============== UNION TYPES ===============
export type MovementType = 'WORKOUT' | 'EXERCISE' | 'TAG';
export type ModalMode = 'ADD' | 'EDIT' | 'VIEW' | 'DELETE';
export type ThemeModeType = 'LIGHT' | 'DARK';

// =============== MOVES ===============
export type WorkoutMode1 = 'SETS' | 'CIRCUIT' | null;
export type WorkoutMode2 = 'REPS' | 'TIMED' | null;

interface WorkoutRest {
  auto: boolean;
  inner: number | null;
  outer: number | null;
}

// interface MoveRefConfig {
//   reps: number | null;
//   weight: number | null;
//   interval: number | null;
// }

export interface MoveRef {
  type: 'EXERCISE' | 'WORKOUT';
  id: string;
  reps: number | null;
  weight: number | null;
  interval: number | null;
}

export interface Id {
  readonly id: string;
}

export interface Tag {
  // readonly id: string;
  // lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  // lastModified: number; // changing to this for now
  name: string;
  description: string;
}

export interface Exercise extends Tag {
  tags: string[];
}

export interface Workout extends Exercise {
  mode: [WorkoutMode1, WorkoutMode2];
  rounds: number | null;
  rest: WorkoutRest;
  movements: MoveRef[];
}

export type TagId = Tag & Id;
export type ExerciseId = Exercise & Id;
export type WorkoutId = Workout & Id;

export interface TagDict {
  [key: string]: TagId;
}

export interface ExerciseDict {
  [key: string]: ExerciseId;
}

export interface WorkoutDict {
  [key: string]: WorkoutId;
}

interface Workouts {
  byId: WorkoutDict;
  allIds: string[];
}

interface Exercises {
  byId: ExerciseDict;
  allIds: string[];
}

export interface Tags {
  byId: TagDict;
  allIds: string[];
}

export type Movement = Workout | Exercise | Tag;
export type MovementId = WorkoutId | ExerciseId | TagId;

export interface MovesState {
  activeId: string | null;
  workouts: Workouts | null;
  exercises: Exercises | null;
  tags: Tags | null;
}

export interface Move {
  data: MovementId | null;
  type: MovementType;
}

// =============== FILTER ===============
export interface FilterState {
  active: boolean;
  open: boolean;
  tags: string[];
  value: string;
}

// =============== ERRORS ===============

export interface AuthError {
  code: string;
  message: string;
}

// =============== USERS ===============
export interface IUser {
  readonly uid: string;
  email: string;
  username: string;
}

// =============== FIREBASE QUERIES ===============
export type AuthUser = firebase.User | null;

// =============== FORM HELPERS ===============
export interface IHandleChange {
  target: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement;
}

// =============== FORM BUTTONS ===============
export interface ButtonRowCancelBtn {
  text: string;
  onClick: () => void;
}
export interface ButtonRowActionBtn {
  text: string;
  onClick?: () => void;
  className?: string;
  // submit: boolean;
}

export interface ButtonRowProps {
  cancelBtn: ButtonRowCancelBtn;
  actionBtn: ButtonRowActionBtn;
}
