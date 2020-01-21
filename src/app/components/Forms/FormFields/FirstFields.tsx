import React from 'react';

import { Row } from '../FormStyles';

import {
  IHandleChange,
  IExerciseFormValues,
  IWorkoutFormValues,
} from '../../../common/types';

const FirstFields: React.FC<{
  form: IExerciseFormValues | IWorkoutFormValues;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, handleChange }) => {
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
      </Row>
    </>
  );
};

export default FirstFields;
