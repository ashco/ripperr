import React, { useContext } from 'react';

import { MovementsContext } from '../../Movements';
import { IMovementRefs, IMovementRefTimedConfig } from '../../../common/types';

const TimedField: React.FC<{
  move: IMovementRefs<IMovementRefTimedConfig>;
  i: number;
  handleChange: (
    i: number,
    config: boolean,
    e: { target: { name: string; value: any } },
  ) => void;
  handleDeleteEx: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteEx }) => {
  const { exercises, loading } = useContext(MovementsContext);

  return (
    <div>
      <div>
        <label htmlFor="id">
          {`Exercise ${i + 1}`}
          <select
            name="id"
            onChange={handleChange.bind(null, i, false)}
            value={move.id}
          >
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
        <label htmlFor="duration">
          <input
            name="duration"
            type="number"
            value={move.config.duration}
            onChange={handleChange.bind(null, i, true)}
          />
          Duration
        </label>
      </div>
      {/* <div>
        <label htmlFor="sets">
          <input
            name="sets"
            type="number"
            value={move.config.sets}
            onChange={handleChange.bind(null, i, true)}
          />
        </label>
      </div> */}
      <button type="button" onClick={(): void => handleDeleteEx(i)}>
        -
      </button>
    </div>
  );
};

export default TimedField;
