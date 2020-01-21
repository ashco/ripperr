import React from 'react';
import styled from 'styled-components';

import { Row } from '../FormStyles';

import { IExerciseFormValues, IWorkoutFormValues } from '../../../common/types';

const RestField: React.FC<{
  form: IExerciseFormValues | IWorkoutFormValues;
  handleChange: (e: any) => void;
}> = ({ form, handleChange }) => {
  return (
    <>
      <Row>Rest Options</Row>
      <Row>
        <div>
          <label>
            <input
              type="checkbox"
              name="auto"
              onChange={handleChange}
              checked={form.rest.auto}
            />
            Automatic
          </label>
        </div>
        <div>
          <label>
            <input
              type="number"
              name="inner"
              onChange={handleChange}
              value={form.rest.inner}
            />
            Inner Rest Time
          </label>
        </div>
        <div>
          <label>
            <input
              type="number"
              name="outer"
              onChange={handleChange}
              value={form.rest.outer}
            />
            Outer Rest Time
          </label>
        </div>
      </Row>
    </>
  );
};

export default RestField;
