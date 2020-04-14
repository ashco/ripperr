import React, { useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';
import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';

import { IMovementRefs } from '../../common/types';
import { MovementType } from '../../common/enums';

const ExerciseListItemForm: React.FC<{
  exercise: IMovementRefs;
  index: number;
  disabled: boolean;
}> = ({ exercise, index, disabled }) => {
  const themeContext = useContext(ThemeContext);
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  const btnRef = useRef<HTMLDivElement>(null);

  // function handleView(e: any): void {
  //   if (!btnRef?.current?.contains(e.target)) {
  //     modalDispatch({ type: 'MODAL_VIEW' });
  //     moveDispatch({ type: 'MOVE_SET', value: exercise });
  //   }
  // }

  return (
    <ExerciseListItemFormWrapper
      // onClick={handleView}
      color={themeContext.color.blue[500]}
    >
      <p className="name">{exercise.name}</p>
      <input
        type="number"
        placeholder="Reps"
        min="0"
        max="999"
        value={exercise.reps}
        onChange={(e) =>
          moveDispatch({
            type: 'MOVE_CHANGE_MOVE_EX_REPS',
            value: e.currentTarget.value,
            index,
          })
        }
        disabled={disabled}
      />
      <input
        type="number"
        placeholder="Sets"
        min="0"
        max="999"
        value={exercise.sets}
        onChange={(e) =>
          moveDispatch({
            type: 'MOVE_CHANGE_MOVE_EX_SETS',
            value: e.currentTarget.value,
            index,
          })
        }
        disabled={disabled}
      />
    </ExerciseListItemFormWrapper>
  );
};

const ExerciseListItemFormWrapper = styled(ListItem)`
  box-shadow: ${(props) => props.theme.shadow[0]};
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  input[type='number'] {
    border: none;
    width: 5.5rem;
  }
`;

export default ExerciseListItemForm;
