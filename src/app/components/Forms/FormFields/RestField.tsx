import React from 'react';
import styled from 'styled-components';

import { Row } from '../styles';

import {
  IHandleChange,
  ExerciseFormState,
  IWorkoutFormState,
} from '../../../common/types';

const RestField: React.FC<{
  form: ExerciseFormState | IWorkoutFormState;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, handleChange }) => {
  return (
    <>
      <Row>Rest Options</Row>
      <Row>
        <label>
          <input
            type="checkbox"
            name="auto"
            onChange={handleChange}
            checked={form.rest.auto}
          />
          Automatic
        </label>
        <label>
          <input
            type="number"
            name="inner"
            min="0"
            onChange={handleChange}
            value={form.rest.inner}
          />
          Inner Time
        </label>
        <label>
          <input
            type="number"
            name="outer"
            min="0"
            onChange={handleChange}
            value={form.rest.outer}
          />
          Outer Time
        </label>
      </Row>
    </>
  );
};

export default RestField;
