import React, { useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';
import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';

import { IMovementRefs } from '../../common/types';
import { MovementType } from '../../common/enums';

const ExerciseListItemForm: React.FC<{ exercise: IMovementRefs }> = ({
  exercise,
}) => {
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
      {/* <p className="name">{exercise.name}</p> */}
      <p className="name">Exercise 1</p>
    </ExerciseListItemFormWrapper>
  );
};

const ExerciseListItemFormWrapper = styled(ListItem)`
  box-shadow: ${(props) => props.theme.shadow[0]};
`;

export default ExerciseListItemForm;
