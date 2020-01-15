import React, { useContext } from 'react';

import { ExercisesContext } from '../../Exercises';
import { IWorkoutExerciseRepsSets } from '../../../common/types';

const RepsSetsField: React.FC<{
  formEx: IWorkoutExerciseRepsSets;
  i: number;
  handleChange: (
    exIndex: number | undefined,
    e: { target: { name: string; value: any } },
  ) => void;
  handleDeleteEx: (i: number) => void;
}> = ({ formEx, i, handleChange, handleDeleteEx }) => {
  const { exercises, exLoading } = useContext(ExercisesContext);

  return (
    <div>
      <div>
        <label htmlFor="exId">
          {`Exercise ${i + 1}`}
          <select
            name="exId"
            onChange={handleChange.bind(null, i)}
            value={formEx.exId}
          >
            <option
              label={exLoading ? 'loading...' : 'Select an exercise'}
              value=""
            />
            {exercises.map((ex) => (
              <option label={ex.name} value={ex.exId} key={ex.exId} />
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
            value={formEx.reps}
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
            value={formEx.sets}
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
