import React, { useContext } from 'react';

import { MovementsContext } from '../../../context';

import { Row } from '../styles';

import { IHandleChange, IMovementRefs } from '../../../common/types';

const TimedField: React.FC<{
  move: IMovementRefs;
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
              name="duration"
              type="number"
              min="0"
              value={move.duration as number}
              onChange={(e): void => handleChange(e, i)}
            />
            Duration
          </label>
        </div>
        <button type="button" onClick={(): void => handleDeleteMovementRef(i)}>
          -
        </button>
      </Row>
    </>
  );
};

export default TimedField;
