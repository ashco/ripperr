import {
  IExercise,
  IWorkout,
  IHandleChange,
  ArchetypeFormState,
  ExerciseFormState,
  IWorkoutFormState,
  IArchetypeFormErrors,
  IExerciseFormErrors,
  IWorkoutFormErrors,
} from './types';

import { FormFieldProp, WorkoutMode, MovementType } from './enums';

function getValue(e: IHandleChange): string | number | boolean | string[] {
  const { options, multiple } = e.target as HTMLSelectElement;
  let value;

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

  return value;
}

function getName(e: IHandleChange): string | null {
  const { options } = e.target as HTMLSelectElement;
  let value = null;

  if (options) {
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value = options[i].label;
      }
    }
  }

  return value;
}
export function handleChange(
  e: IHandleChange,
  state: ArchetypeFormState | ExerciseFormState | IWorkoutFormState,
  setState: (state: any) => void,
  config?: {
    type: FormFieldProp;
    index?: number;
  },
): void {
  const newState = { ...state };
  const name: string = e.target.name;

  const value = getValue(e);

  // State Assignment
  if (config && config.type === FormFieldProp.Movements) {
    newState.movements[config.index as number][name] = value;
    if (name === 'id') {
      const optionName = getName(e);
      newState.movements[config.index as number]['name'] = optionName;
    }
  } else if (config && config.type === FormFieldProp.Rest) {
    newState.rest[name] = value;
  } else if (config && config.type === FormFieldProp.Config) {
    newState.config[name] = value;
  } else {
    newState[name] = value;
  }

  setState(newState);
}

export function handleValidation(
  e: IHandleChange,
  errors: any,
  setErrors: (state: any) => void,
): void {
  const name: string = e.target.name;

  const value = getValue(e);

  let errorMsg = '';

  switch (name) {
    case 'name':
      if ((value as string).length < 2) {
        errorMsg = 'Name is too short.';
      }
      break;
    case 'description':
      if ((value as string).length > 140) {
        errorMsg = 'Description is too long.';
      }
      break;
    case 'tags':
      break;
    default:
      break;
  }
  setErrors({ ...errors, [name]: errorMsg });
}

export function validateForm(
  errors: IArchetypeFormErrors | IExerciseFormErrors | IWorkoutFormErrors,
): boolean {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false),
  );
  return valid;
}
