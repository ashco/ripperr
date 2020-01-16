import React, { useContext } from 'react';

import { ExercisesContext } from '../../Exercises';
import { IWorkoutExerciseRepsSets } from '../../../common/types';

const RepsSetsField: React.FC<{
  move: IWorkoutExerciseRepsSets;
  i: number;
  handleChange: (
    exIndex: number | undefined,
    e: { target: { name: string; value: any } },
  ) => void;
  handleDeleteEx: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteEx }) => {
  const { exercises, exLoading } = useContext(ExercisesContext);

  return (
    <div>
      <div>
        <label htmlFor="id">
          {`Exercise ${i + 1}`}
          <select
            name="id"
            onChange={handleChange.bind(null, i)}
            value={move.id}
          >
            <option
              label={exLoading ? 'loading...' : 'Select an exercise'}
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
            onChange={handleChange.bind(null, i)}
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
            onChange={handleChange.bind(null, i)}
          />
        </label>
      </div>
      <button type="button" onClick={(): void => handleDeleteEx(i)}>
        -
      </button>
    </div>
  );
};

export default RepsSetsField;
