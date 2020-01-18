import React from 'react';

import { IWorkoutRest } from '../../common/types';

const RestField: React.FC<{
  rest: IWorkoutRest;
  handleChange: (e: {
    target: { type: string; name: string; value: any; checked: any };
  }) => void;
}> = ({ rest, handleChange }) => {
  return (
    <div>
      <div>
        <label htmlFor="automatic">
          <input
            type="checkbox"
            name="automatic"
            onChange={handleChange}
            checked={rest.automatic}
          />
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
        </label>
      </div>
    </div>
  );
};

export default RestField;
