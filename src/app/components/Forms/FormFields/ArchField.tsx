import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../../context';
import { useMoveDispatch } from '../../../context/MoveContext';
import { Row } from '../styles';

import { ArchListItemModal } from '../../ListItems';
import { Button } from '../../Buttons';

import { IHandleChange, Exercise, Workout } from '../../../common/types';

const ArchField: React.FC<{
  //   form: Workout;
  //   handleClick: (e: IHandleChange) => void;
  // }> = ({ form, handleClick }) => {
  moveState: Exercise | Workout;
  disabled: boolean;
}> = ({ moveState, disabled }) => {
  const { archetypes } = React.useContext(MovementListContext);
  const moveDispatch = useMoveDispatch();

  function handleClick(e: any) {
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
          <ArchListItemModal
            key={arch.id}
            archetype={arch}
            active={moveState.tags.includes(arch.id as string)}
          />
          // <ArchButton
          //   active={moveState.tags.includes(arch.id as string)}
          //   key={arch.id}
          //   value={arch.id}
          //   onClick={handleClick}
          //   disabled={disabled}
          // >
          //   {arch.name}
          // </ArchButton>
        ))}
      </Row>
    </>
  );
};

const ArchButton = styled(Button)<{ active: boolean }>`
  /* border-color: ${(props) => (props.active ? 'red' : 'white')}; */
  border-color: ${(props) =>
    props.active ? props.theme.color.orange[500] : 'white'};
  background-color: ${(props) =>
    props.active ? props.theme.color.orange[500] : 'default'};
  color: ${(props) => (props.active ? 'black' : 'default')};
  font-weight: ${(props) => (props.active ? '600' : 'default')};
`;

export default ArchField;
