﻿import React, { useContext } from 'react';

import { MovementsContext } from '../../Movements';

import { Row } from '../FormStyles';
import { IMovementRefs, IMovementRefRepsConfig } from '../../../common/types';

const RepsField: React.FC<{
  move: IMovementRefs<IMovementRefRepsConfig>;
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
    <>
      <Row>Exercise {i + 1}</Row>
      <Row>
        <div>
          <label htmlFor="id">
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
          <label htmlFor="reps">
            <input
              name="reps"
              type="number"
              value={move.config.reps}
              onChange={handleChange.bind(null, i, true)}
            />
            Reps
          </label>
        </div>
        <div>
          <label htmlFor="sets">
            <input
              name="sets"
              type="number"
              value={move.config.sets}
              onChange={handleChange.bind(null, i, true)}
            />
            Sets
          </label>
        </div>
        <button type="button" onClick={(): void => handleDeleteEx(i)}>
          -
        </button>
      </Row>
    </>
  );
};

export default RepsField;
