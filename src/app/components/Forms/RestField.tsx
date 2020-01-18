import React from 'react';
import styled from 'styled-components';

import { IWorkoutRest } from '../../common/types';

const RestField: React.FC<{
  rest: IWorkoutRest;
  handleChange: (e: {
    target: { type: string; name: string; value: any; checked: any };
  }) => void;
}> = ({ rest, handleChange }) => {
  return (
    <FieldRow>
      Rest Options
      <div>
        <label htmlFor="automatic">
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
        <label htmlFor="inner">
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
        <label htmlFor="outer">
          <input
            name="outer"
            type="number"
            value={rest.outer}
            onChange={handleChange}
          />
          Outer Rest Time
        </label>
      </div>
    </FieldRow>
  );
};

const FieldRow = styled.div`
  display: flex;
`;

export default RestField;
