import React from 'react';
import styled from 'styled-components';

import { useMoveDispatch } from '../../../context/MoveContext';

import { Row } from '../styles';

import { IWorkoutRest } from '../../../types/types';
import { ModalMode } from '../../../types/enums';

const RestField: React.FC<{
  rest: IWorkoutRest;
  disabled: boolean;
}> = ({ rest, disabled }) => {
  const moveDispatch = useMoveDispatch();

  return (
    <Row>
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
        Automatic
      </label>
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
    </Row>
  );
};

export default RestField;
