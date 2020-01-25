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
        id="description"
        name="description"
        placeholder="Enter a description..."
        value={form.description}
        onChange={handleChange}
      />
      <span className="error">{errors.description}</span>
      <label htmlFor="tags">
        Tags
        <div></div>
        <select multiple name="tags" value={form.tags} onChange={handleChange}>
          <TagOption label="PUSH" value="Push" />
          <TagOption label="PULL" value="Pull" />
          <TagOption label="SQUAT" value="Squat" />
          <TagOption label="CORE" value="Core" />
        </select>
      </label>
      <span className="error">{errors.tags}</span>
    </FirstFieldsWrapper>
  );
};

const FirstFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* input,
  textarea {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  } */
  #description {
    height: 3rem;
    resize: none;
  }
`;

const TagOption = styled.option`
  height: auto;
  width: auto;
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
  font-size: 1rem;
  text-align: center;
  &:hover {
    background: grey;
  }
`;

export default FirstFields;
