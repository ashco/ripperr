import React, { useContext } from 'react';

import { ExercisesContext } from '../Exercises';
import { IWorkoutRest } from '../../common/types';

const RestField: React.FC<{
  rest: IWorkoutRest;
  handleChange: (e: { target: { name: string; value: any } }) => void;
}> = ({ rest, handleChange }) => {
  // const { exercises, loading } = useContext(ExercisesContext);

  return (
    <div>
      <div>
        <label htmlFor="rest-automatic">
          <input
            type="checkbox"
            name="rest-automatic"
            onChange={handleChange}
            checked={rest.automatic}
          />
        </label>
      </div>
      {/* <div>
        <label htmlFor="reps">
          <input
            name="reps"
            type="number"
            placeholder="0"
            value={move.reps}
            onChange={handleChange}
          />
        </label>
      </div> */}
      {/* <div>
        <label htmlFor="sets">
          <input
            name="sets"
            type="number"
            placeholder="0"
            value={move.sets}
            onChange={handleChange}
          />
        </label>
      </div> */}
      {/* <button type="button" onClick={(): void => handleDeleteEx(i)}>
        -
      </button> */}
    </div>
  );
};

export default RestField;
