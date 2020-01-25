import React from 'react';
import styled from 'styled-components';

import { Row } from '../styles';

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
    <FirstFieldsWrapper>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <span className="error">{errors.name}</span>
      <textarea
        name="description"
        placeholder="Enter a description..."
        value={form.description}
        onChange={handleChange}
      />
      <span className="error">{errors.description}</span>
      <label htmlFor="tags">
        Tags
        <select multiple name="tags" value={form.tags} onChange={handleChange}>
          <option label="PUSH" value="Push" />
          <option label="PULL" value="Pull" />
          <option label="SQUAT" value="Squat" />
          <option label="CORE" value="Core" />
        </select>
      </label>
      <span className="error">{errors.tags}</span>
    </FirstFieldsWrapper>
  );
};

const FirstFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  input,
  textarea {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
  textarea {
    height: 3rem;
    resize: none;
  }
  .error {
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  }
`;

export default FirstFields;
