import React from 'react';
import styled from 'styled-components';

import { Row } from '../FormStyles';

import { IExerciseFormValues, IWorkoutFormValues } from '../../../common/types';

const RestField: React.FC<{
  form: IExerciseFormValues | IWorkoutFormValues;
  handleChange: (e: any, property: string) => void;
}> = ({ form, handleChange }) => {
  return (
    <>
      <Row>Rest Options</Row>
      <Row>
        <div>
          <label>
            <input
              type="checkbox"
              name="rest-auto"
              onChange={(e) => handleChange(e, "rest-auto")}
              checked={form["rest-auto"]}
            />
            Automatic
          </label>
        </div>
        <div>
          <label>
            <input
              name="rest-inner"
              type="number"
              value={form['rest-inner']}
              onChange={(e) => handleChange(e, "rest-inner")}
            />
            Inner Rest Time
          </label>
        </div>
        <div>
          <label>
            <input
              name="rest-outer"
              type="number"
              value={form['rest-outer']}
              onChange={(e) => handleChange(e, "rest-outer")}
            />
            Outer Rest Time
          </label>
        </div>
      </Row>
    </>
  );
};

export default RestField;
