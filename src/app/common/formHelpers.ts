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
): void {
  const newState = { ...state };
  const { name, options } = e.target;

  let value;

  if (options) {
    // Multi Select
    const optionsArr = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        optionsArr.push(options[i].value);
      }
    }
    newState[name] = optionsArr;
  } else {
    let { value } = e.target;
    if (e.target.type === 'checkbox') {
      value = e.target.checked as boolean;
    }
    newState[name] = value;
  }

  setState(newState);
}
