import {
  IHandleChange,
  IExerciseFormValues,
  IWorkoutFormValues,
} from './types';

import { FormFieldProp, WorkoutMode } from './enums';

export function handleChange(
  e: IHandleChange,
  state: IExerciseFormValues | IWorkoutFormValues,
  setState: (state: any) => void,
  config?: {
    type: FormFieldProp;
    index?: number;
  },
): void {
  const newState = { ...state };
  const name: string = e.target.name;
  const { options, multiple } = e.target as HTMLSelectElement;

  let value;

  // Determine Value
  if (options && multiple) {
    // Multi Select
    value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    // Checkbox
  } else if (e.target.type === 'checkbox') {
    value = (e.target as HTMLInputElement).checked as boolean;
    // number
  } else if (e.target.type === 'number') {
    value = parseInt(e.target.value);
    //  text | select
  } else {
    value = e.target.value;
  }

  // State Assignment
  if (config && config.type === FormFieldProp.Movements) {
    newState.movements[config.index as number][name] = value;
  } else if (config && config.type === FormFieldProp.Rest) {
    newState.rest[name] = value;
  } else if (config && config.type === FormFieldProp.Config) {
    newState.config[name] = value;
  } else {
    newState[name] = value;
  }

  console.log(newState);
  setState(newState);
}
