import React, { useContext } from 'react';

import { MovementsContext } from '../../../context';

import { Row } from '../FormStyles';

import { IHandleChange, IMovementRefReps } from '../../../common/types';

const RepsField: React.FC<{
  move: IMovementRefReps;
  i: number;
  handleChange: (e: IHandleChange, i: number) => void;
  handleDeleteMovementRef: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteMovementRef }) => {
  const { exercises, loading } = useContext(MovementsContext);

  return (
    <>
      <Row>Exercise {i + 1}</Row>
      <Row>
        <div>
          <label>
            <select
              name="id"
              onChange={(e): void => handleChange(e, i)}
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
          <label>
            <input
              name="reps"
              type="number"
              value={move.reps}
              onChange={(e): void => handleChange(e, i)}
            />
            Reps
          </label>
        </div>
        <div>
          <label>
            <input
              name="sets"
              type="number"
              value={move.sets}
              onChange={(e): void => handleChange(e, i)}
            />
            Sets
          </label>
        </div>
        <button type="button" onClick={(): void => handleDeleteMovementRef(i)}>
          -
        </button>
      </Row>
    </>
  );
};

export default RepsField;
