import React from 'react';
import styled from 'styled-components';

import { Row } from '../FormStyles';

import { IWorkoutRest } from '../../../common/types';

const RestField: React.FC<{
  rest: IWorkoutRest;
  handleChange: (e: {
    target: { type: string; name: string; value: any; checked: any };
  }) => void;
}> = ({ rest, handleChange }) => {
  return (
    <>
      <Row>Rest Options</Row>
      <Row>
        <div>
          <label>
            <input
              type="checkbox"
              name="automatic"
              onChange={handleChange}
              checked={rest.automatic}
            />
            Automatic
          </label>
        </div>
        <div>
          <label>
            <input
              name="inner"
              type="number"
              value={rest.inner}
              onChange={handleChange}
            />
            Inner Rest Time
          </label>
        </div>
        <div>
          <label>
            <input
              name="outer"
              type="number"
              value={rest.outer}
              onChange={handleChange}
            />
            Outer Rest Time
          </label>
        </div>
      </Row>
    </>
  );
};

export default RestField;
