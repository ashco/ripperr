import React from 'react';

type FilterActionType =
  | 'FILTER_MODE_ON'
  | 'FILTER_MODE_OFF'
  | 'FILTER_CHANGE_VALUE'
  | 'FILTER_CLEAR_VALUE'
  | 'FILTER_TOGGLE_ARCH';
type FilterAction = {
  type: FilterActionType;
  value?: string;
};
type FilterDispatch = (action: FilterAction) => void;
type FilterState = { active: boolean; value: string; archs: string[] };
type FilterProviderProps = { children: React.ReactNode };

const INITIAL_FILTER_STATE: FilterState = {
  active: false,
  value: '',
  archs: [],
};

const FilterStateContext = React.createContext<FilterState | undefined>(
  undefined,
);
const FilterDispatchContext = React.createContext<FilterDispatch | undefined>(
  undefined,
);

function filterReducer(state: FilterState, action: FilterAction) {
  const { type, value = 'NO VALUE SET' } = action;

  console.log(type);

  switch (action.type) {
    case 'FILTER_MODE_ON':
      return { ...state, active: true };
    case 'FILTER_MODE_OFF':
      return { ...state, active: false };
    case 'FILTER_CHANGE_VALUE':
      return { ...state, value };
    case 'FILTER_CLEAR_VALUE':
      return { ...state, value: '' };
    case 'FILTER_TOGGLE_ARCH': {
      console.log(state);
      const { archs } = state;
      const index = archs.indexOf(value);

      if (index > -1) {
        archs.splice(index, 1);
      } else {
        archs.push(value);
      }
      return { ...state, archs };
    }
    default: {
      throw Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function FilterProvider({ children }: FilterProviderProps) {
  const [state, dispatch] = React.useReducer(
    filterReducer,
    INITIAL_FILTER_STATE,
  );

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}

function useFilterState() {
  const context = React.useContext(FilterStateContext);
  if (context === undefined) {
    throw Error('useFilterState must be used within a FilterProvider');
  }
  return context;
}

function useFilterDispatch() {
  const context = React.useContext(FilterDispatchContext);
  if (context === undefined) {
    throw Error('useFilterDispatch must be used within a FilterProvider');
  }
  return context;
}

export { FilterProvider, useFilterState, useFilterDispatch };
