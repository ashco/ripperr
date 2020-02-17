import React from 'react';

import {
  ArchetypeFormState,
  ExerciseFormState,
  WorkoutFormState,
} from '../common/types';
import { MovementType, WorkoutMode } from '../common/enums';

type FormActionType =
  | 'FORM_CLEAR'
  | 'FORM_RESET_AR'
  | 'FORM_RESET_EX'
  | 'FORM_RESET_WO'
  // | 'FORM_SET'
  | 'FORM_NAME'
  | 'FORM_DESCRIPTION'
  | 'FORM_TAG';

type FormAction = { type: FormActionType; value?: string };
type FormDispatch = (action: FormAction) => void;
type FormState =
  | ArchetypeFormState
  | ExerciseFormState
  | WorkoutFormState
  | null;
type FormProviderProps = { children: React.ReactNode };

const INITIAL_FORM_STATE_AR: ArchetypeFormState = {
  type: MovementType.Archetype,
  name: '',
  description: '',
};

const INITIAL_FORM_STATE_EX: ExerciseFormState = {
  type: MovementType.Exercise,
  name: '',
  description: '',
  tags: [],
};

const INITIAL_FORM_STATE_WO: WorkoutFormState = {
  type: MovementType.Workout,
  name: '',
  description: '',
  tags: [],
  mode: WorkoutMode.Reps,
  movements: [
    {
      id: '',
      name: '',
      reps: 0,
      sets: 0,
      duration: 0,
    },
  ],
  rest: {
    auto: true,
    inner: 45,
    outer: 60,
  },
  config: {
    // TIMED
    // rounds: 1,
  },
};

const FormStateContext = React.createContext<FormState | undefined>(undefined);
const FormDispatchContext = React.createContext<FormDispatch | undefined>(
  undefined,
);

function formReducer(state: FormState, action: FormAction): FormState {
  const { type, value = 'NO VALUE SET' } = action;

  console.log(type);

  switch (type) {
    case 'FORM_CLEAR':
      return null;
    case 'FORM_RESET_AR':
      return { ...INITIAL_FORM_STATE_AR };
    case 'FORM_RESET_EX':
      return { ...INITIAL_FORM_STATE_EX };
    case 'FORM_RESET_WO':
      return { ...INITIAL_FORM_STATE_WO };
    case 'FORM_NAME':
      return { ...state, name: value } as
        | ArchetypeFormState
        | ExerciseFormState
        | WorkoutFormState;
    case 'FORM_DESCRIPTION':
      return { ...state, description: value } as
        | ArchetypeFormState
        | ExerciseFormState
        | WorkoutFormState;
    // case 'FORM_TAG':
    // if (
    //   movementType !== MovementType.Exercise &&
    //   movementType !== MovementType.Workout
    // ) {
    //   throw Error();
    // }

    // return { ...state, tags: [...state.tags, action.value] };
    // case FormActionType.RemoveTag: {
    //   if (
    //     movementType !== MovementType.Exercise &&
    //     movementType !== MovementType.Workout
    //   ) {
    //     throw Error();
    //   }
    //   const tags = (state as
    //     | ExerciseFormState
    //     | WorkoutFormState).tags.filter((tag) => tag === action.value);
    //   return { ...state, tags };
    // }
    default:
      throw Error();
  }
}

function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = React.useReducer(formReducer, null);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}

function useFormState(): FormState {
  const context = React.useContext(FormStateContext);
  if (context === undefined) {
    throw Error('useFormState must be used within a FormProvider');
  }
  return context;
}

function useFormDispatch(): FormDispatch {
  const context = React.useContext(FormDispatchContext);
  if (context === undefined) {
    throw Error('useFormDispatch must be used within a FormProvider');
  }
  return context;
}

export { FormProvider, useFormState, useFormDispatch };
