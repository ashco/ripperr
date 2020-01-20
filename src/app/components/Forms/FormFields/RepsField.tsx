import React, { useContext } from 'react';

import { MovementsContext } from '../../../context';

import { Row } from '../FormStyles';

import { IMovementRefs, IMovementRefRepsConfig } from '../../../common/types';

const RepsField: React.FC<{
  move: IMovementRefs<IMovementRefRepsConfig>;
  i: number;
  handleChange: (e: any, object: any, type?: any) => void;
  handleDeleteEx: (i: number) => void;
}> = ({ move, i, handleChange, handleDeleteEx }) => {
  const { exercises, loading } = useContext(MovementsContext);

  return (
    <>
      <Row>Exercise {i + 1}</Row>
      <Row>
        {/* <div>
          <label>
            <select
              name="id"
              onChange={(e) => handleChange(e, form.movements[i], 'movement')}
              // onChange={handleChange.bind(null, i, false)}
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
        </div> */}
        <div>
          <label>
            <input
              name="reps"
              type="number"
              value={move.config.reps}
              onChange={(e) => handleChange(e, move, {type: 'movement', index: i})}
            />
            Reps
          </label>
        </div>
        {/* <div>
          <label>
            <input
              name="sets"
              type="number"
              value={move.config.sets}
              onChange={handleChange.bind(null, i, true)}
            />
            Sets
          </label>
        </div> */}
        <button type="button" onClick={(): void => handleDeleteEx(i)}>
          -
        </button>
      </Row>
    </>
  );
};

export default RepsField;
