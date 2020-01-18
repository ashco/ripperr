import React, { useContext } from 'react';

import { ExercisesContext } from '../Exercises';
import { IMovementRefs } from '../../common/types';

const RepsField: React.FC<{
  move: IMovementRefs;
  i: number;
  handleChange: (e: { target: { name: string; value: any } }) => void;
  handleDeleteEx: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteEx }) => {
  const { exercises, loading } = useContext(ExercisesContext);

  return (
    <div>
      <div>
        <label htmlFor="id">
          {`Exercise ${i + 1}`}
          <select name="id" onChange={handleChange} value={move.id}>
            <option
              label={loading ? 'loading...' : 'Select an exercise'}
              value=""
            />
            {exercises.map((ex) => (
              <option label={ex.name} value={ex.id} key={ex.id} />
            ))}
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="reps">
          <input
            name="reps"
            type="number"
            placeholder="0"
            value={move.reps}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="sets">
          <input
            name="sets"
            type="number"
            placeholder="0"
            value={move.sets}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="button" onClick={(): void => handleDeleteEx(i)}>
        -
      </button>
    </div>
  );
};

export default RepsField;
