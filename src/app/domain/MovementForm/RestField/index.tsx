import React from 'react';
import RestFieldWrapper from './style';

import { useMoveDispatch } from '@/context/MoveContext';

import { IWorkoutRest } from '@/types/types';

const RestField: React.FC<{
  rest: IWorkoutRest;
  disabled: boolean;
}> = ({ rest, disabled }) => {
  const moveDispatch = useMoveDispatch();

  return (
    <RestFieldWrapper disabled={disabled}>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            name="auto"
            onChange={(e) =>
              moveDispatch({
                type: 'MOVE_CHANGE_REST_AUTO',
                value: e.currentTarget.checked,
              })
            }
            checked={rest.auto}
            disabled={disabled}
          />
          <span>Automatic</span>
        </label>
      </div>
      <div className="number-container">
        <label>
          <input
            type="number"
            name="inner"
            min="0"
            onChange={(e) =>
              moveDispatch({
                type: 'MOVE_CHANGE_REST_INNER',
                value: e.currentTarget.value,
              })
            }
            value={rest.inner}
            disabled={disabled}
          />
          Inner
        </label>
        <label>
          <input
            type="number"
            name="outer"
            min="0"
            onChange={(e) =>
              moveDispatch({
                type: 'MOVE_CHANGE_REST_OUTER',
                value: e.currentTarget.value,
              })
            }
            value={rest.outer}
            disabled={disabled}
          />
          Outer
        </label>
      </div>
    </RestFieldWrapper>
  );
};

export default RestField;
