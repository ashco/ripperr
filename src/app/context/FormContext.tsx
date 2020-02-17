import React from 'react';

import { ArchetypeFormState, ExerciseFormState } from '../common/types';

type FormActionType = 'FORM_NAME' | 'FORM_DESCRIPTION' | 'FORM_TAG';
type Action = { type: FormActionType; value: string };
type Dispatch = (action: Action) => void;
type State = ArchetypeFormState | ExerciseFormState;
type FormProviderProps = { children: React.ReactNode };

const INITIAL_FORM_STATE_AR: ArchetypeFormState = {
  name: 'test',
  description: '',
};

const FormStateContext = React.createContext<State | undefined>(undefined);
const FormDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FORM_NAME':
      return { ...state, name: action.value };
    case 'FORM_DESCRIPTION':
      return { ...state, description: action.value };
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
    //     | IWorkoutFormState).tags.filter((tag) => tag === action.value);
    //   return { ...state, tags };
    // }
    default:
      throw Error();
  }
}

function FormProvider({ children }: FormProviderProps) {
  const [state, dispatch] = React.useReducer(
    formReducer,
    INITIAL_FORM_STATE_AR,
  );

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}

function useFormState(): State {
  const context = React.useContext(FormStateContext);
  if (context === undefined) {
    throw Error('useFormState must be used within a FormProvider');
  }
  return context;
}

function useFormDispatch(): Dispatch {
  const context = React.useContext(FormDispatchContext);
  if (context === undefined) {
    throw Error('useFormDispatch must be used within a FormProvider');
  }
  return context;
}

export { FormProvider, useFormState, useFormDispatch };
