import React from 'react';

import { Movement, Archetype, Exercise, Workout } from '../common/types';
import { MovementType, WorkoutMode } from '../common/enums';

type FormActionType =
  | 'MOVE_CLEAR'
  | 'MOVE_RESET_AR'
  | 'MOVE_RESET_EX'
  | 'MOVE_RESET_WO'
  | 'MOVE_SET'
  | 'MOVE_CHANGE_NAME'
  | 'MOVE_CHANGE_DESCRIPTION'
  | 'MOVE_CHANGE_ARCH';

type FormAction = { type: FormActionType; value?: string | Movement };
type MoveDispatch = (action: FormAction) => void;
type MoveState = Movement | null;
type MoveProviderProps = { children: React.ReactNode };

const INITIAL_MOVE_STATE_AR: Archetype = {
  type: MovementType.Archetype,
  name: '',
  description: '',
};

const INITIAL_MOVE_STATE_EX: Exercise = {
  type: MovementType.Exercise,
  name: '',
  description: '',
  tags: [],
};

const INITIAL_MOVE_STATE_WO: Workout = {
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

const MovementStateContext = React.createContext<MoveState | undefined>(
  undefined,
);
const MovementDispatchContext = React.createContext<MoveDispatch | undefined>(
  undefined,
);

function formReducer(state: MoveState, action: FormAction): MoveState {
  const { type, value = 'NO VALUE SET' } = action;

  console.log(type);
  console.log(value);
  console.log(state);

  switch (type) {
    case 'MOVE_CLEAR':
      return null;
    case 'MOVE_RESET_AR':
      return { ...INITIAL_MOVE_STATE_AR };
    case 'MOVE_RESET_EX':
      return { ...INITIAL_MOVE_STATE_EX };
    case 'MOVE_RESET_WO':
      return { ...INITIAL_MOVE_STATE_WO };
    case 'MOVE_SET':
      return { ...(value as Movement) };
    case 'MOVE_CHANGE_NAME':
      return { ...state, name: value } as Movement;
    case 'MOVE_CHANGE_DESCRIPTION':
      return { ...state, description: value } as Movement;
    case 'MOVE_CHANGE_ARCH': {
      if (state?.type === MovementType.Archetype) {
        throw Error();
      } else if (
        state?.type === MovementType.Exercise ||
        state?.type === MovementType.Workout
      ) {
        const { tags } = state as Exercise | Workout;
        // add or remove value
        const index = tags.indexOf(value as string);
        console.log(index);
        if (index >= 0) {
          console.log('1');
          tags.splice(index, 1);
        } else {
          console.log('2');
          tags.push(value as string);
        }

        console.log(tags);

        return { ...state, tags };
      }
    }
    // if (
    //   state?.type !== MovementType.Exercise &&
    //   state?.type !== MovementType.Workout
    // ) {
    //   throw Error();
    // }

    // const tags = (state as ).tags;

    // console.log(state, action);

    // return { ...(value as Movement) };

    // case 'MOVE_CHANGE_TAG':
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

function MoveProvider({ children }: MoveProviderProps) {
  const [state, dispatch] = React.useReducer(formReducer, null);

  return (
    <MovementStateContext.Provider value={state}>
      <MovementDispatchContext.Provider value={dispatch}>
        {children}
      </MovementDispatchContext.Provider>
    </MovementStateContext.Provider>
  );
}

function useMoveState(): MoveState {
  const context = React.useContext(MovementStateContext);
  if (context === undefined) {
    throw Error('useMoveState must be used within a MoveProvider');
  }
  return context;
}

function useMoveDispatch(): MoveDispatch {
  const context = React.useContext(MovementDispatchContext);
  if (context === undefined) {
    throw Error('useMoveDispatch must be used within a MoveProvider');
  }
  return context;
}

export { MoveProvider, useMoveState, useMoveDispatch };
