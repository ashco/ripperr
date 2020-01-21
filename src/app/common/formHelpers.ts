import { IExerciseFormValues, IWorkoutFormValues } from './types';

export function handleChange(
  e: {
    target: {
      name: string;
      value: string | number | boolean;
      type: string;
      checked?: boolean;
      options?: any;
    };
  },
  state: IExerciseFormValues | IWorkoutFormValues,
  setState: any,
  config?: {
    type: string;
    index?: number;
  },
): void {
  const newState = { ...state };
  const { name, options } = e.target;

  let value;

  // Determine Value
  if (options) {
    // Multi Select
    value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    // Checkbox
  } else if (e.target.type === 'checkbox') {
    value = e.target.checked as boolean;
    // text | number | select
  } else {
    value = e.target.value;
  }

  // State Assignment
  if (config && config.type === 'rest') {
    newState.rest[name] = value;
  } else if (config && config.type === 'movements') {
    newState.movements[config.index as number][name] = value;
  } else {
    newState[name] = value;
  }
  console.log(newState);
  setState(newState);
}
