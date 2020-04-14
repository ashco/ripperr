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
  | 'MOVE_CHANGE_MODE'
  | 'MOVE_CHANGE_MOVE_EX_REPS'
  | 'MOVE_CHANGE_MOVE_EX_SETS'
  | 'MOVE_CHANGE_ARCH';

type FormAction = {
  type: FormActionType;
  value?: string | number | Movement;
  index?: number | null;
};
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
  const { type, value = 'NO VALUE SET', index = null } = action;

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
    case 'MOVE_CHANGE_MODE':
      return { ...state, mode: value } as Workout;
    case 'MOVE_CHANGE_MOVE_EX_REPS': {
      const newMovements = [...(state as Workout).movements];
      if (index === null) {
        throw Error('index is null');
      }
      newMovements[index].reps = value as number;
      return { ...state } as Workout;
    }
    case 'MOVE_CHANGE_MOVE_EX_SETS': {
      const newMovements = [...(state as Workout).movements];
      if (index === null) {
        throw Error('index is null');
      }
      newMovements[index].sets = value as number;
      return { ...state } as Workout;
    }
    case 'MOVE_CHANGE_ARCH': {
      if (
        state?.type === MovementType.Exercise ||
        state?.type === MovementType.Workout
      ) {
        const { tags } = state as Exercise | Workout;
        // add or remove value
        const index = tags.indexOf(value as string);
        const newTags = [...tags];
        if (index >= 0) {
          newTags.splice(index, 1);
        } else {
          newTags.push(value as string);
        }
        return { ...state, tags: newTags };
      } else {
        throw Error('MOVE_CHANGE_ARCH state type is note Exercise or Workout.');
      }
    }
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
