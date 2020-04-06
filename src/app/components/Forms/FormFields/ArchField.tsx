import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../../context';
import { useMoveDispatch } from '../../../context/MoveContext';
import { Row } from '../styles';

import { IHandleChange, Exercise, Workout } from '../../../common/types';

const ArchField: React.FC<{
  //   form: Workout;
  //   handleChange: (e: IHandleChange) => void;
  // }> = ({ form, handleChange }) => {
  moveState: Exercise | Workout;
}> = ({ moveState }) => {
  const { archetypes } = React.useContext(MovementListContext);
  const moveDispatch = useMoveDispatch();

  function handleChange(e: any) {
    e.preventDefault();

    moveDispatch({
      type: 'MOVE_CHANGE_ARCH',
      value: e.target.value,
    });
  }

  return (
    <>
      <Row>
        {archetypes.map((arch) => (
          <label key={arch.id}>
            <input
              type="checkbox"
              value={arch.id}
              checked={moveState.tags.includes(arch.id as string)}
              onChange={handleChange}
            />
            {arch.name}
          </label>
        ))}
      </Row>
    </>
  );
};

export default ArchField;
