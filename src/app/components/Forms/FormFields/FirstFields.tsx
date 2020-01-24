import React from 'react';

import { Row } from '../FormStyles';

import {
  IHandleChange,
  IExerciseFormValues,
  IWorkoutFormValues,
  IExerciseFormErrors,
  // IWorkoutFormErrors,
} from '../../../common/types';

const FirstFields: React.FC<{
  form: IExerciseFormValues | IWorkoutFormValues;
  errors: IExerciseFormErrors;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, errors, handleChange }) => {
  return (
    <>
      <Row>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <span className="error">{errors.name}</span>
      </Row>
      <Row>
        <label htmlFor="description">
          <textarea
            name="description"
            placeholder="Enter a description..."
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <span className="error">{errors.description}</span>
      </Row>
      <Row>
        <label htmlFor="tags">
          Tags
          <select
            multiple
            name="tags"
            value={form.tags}
            onChange={handleChange}
          >
            <option label="PUSH" value="Push" />
            <option label="PULL" value="Pull" />
            <option label="SQUAT" value="Squat" />
            <option label="CORE" value="Core" />
          </select>
        </label>
        <span className="error">{errors.tags}</span>
      </Row>
    </>
  );
};

export default FirstFields;
