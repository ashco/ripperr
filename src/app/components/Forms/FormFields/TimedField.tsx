import React, { useContext } from 'react';

import { MovementsContext } from '../../../context';

import { Row } from '../FormStyles';

import { IMovementRefTimed } from '../../../common/types';

const TimedField: React.FC<{
  move: IMovementRefTimed;
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
          <label>
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
          <label>
            <input
              name="duration"
              type="number"
              value={move.duration}
              onChange={handleChange.bind(null, i, true)}
            />
            Duration
          </label>
        </div>
        <button type="button" onClick={(): void => handleDeleteEx(i)}>
          -
        </button>
      </Row>
    </>
  );
};

export default TimedField;
