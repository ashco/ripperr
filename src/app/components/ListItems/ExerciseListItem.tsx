import React, { useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';
import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';
import ColorBarWrapper from '../Containers/ColorBarWrapper';

import { Exercise } from '../../types/types';
import { MovementType } from '../../types/enums';

const ExerciseListItem: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const themeContext = useContext(ThemeContext);
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  const btnRef = useRef<HTMLDivElement>(null);

  function handleView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      modalDispatch({ type: 'MODAL_VIEW' });
      moveDispatch({ type: 'MOVE_SET', value: exercise });
    }
  }

  return (
    <ColorBarWrapper type="thin" color="purple">
      <ExerciseListItemWrapper onClick={handleView}>
        <p className="name">{exercise.name}</p>
        <div className="list-item-menu-container">
          <div ref={btnRef} className="btn-wrapper">
            <ListItemMenuButton movement={exercise} />
          </div>
        </div>
      </ExerciseListItemWrapper>
    </ColorBarWrapper>
  );
};

const ExerciseListItemWrapper = styled(ListItem)``;

export default ExerciseListItem;
