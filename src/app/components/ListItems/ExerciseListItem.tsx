import React, { useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';
import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Buttons';

import { Exercise } from '../../common/types';
import { MovementType } from '../../common/enums';

const ExerciseListItem: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
  const themeContext = useContext(ThemeContext);
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  const btnRef = useRef<HTMLDivElement>(null);

  function handleView(e: any): void {
    console.log(exercise);

    if (!btnRef?.current?.contains(e.target)) {
      modalDispatch({ type: 'MODAL_VIEW' });
      moveDispatch({ type: 'MOVE_SET', value: exercise });
    }
  }

  return (
    <ExerciseListItemWrapper
      onClick={handleView}
      color={themeContext.color.blue[500]}
    >
      <p className="name">{exercise.name}</p>
      <div className="list-item-menu-container">
        <div ref={btnRef} className="btn-wrapper">
          <ListItemMenuButton movement={exercise} />
        </div>
      </div>
    </ExerciseListItemWrapper>
  );
};

const ExerciseListItemWrapper = styled(ListItem)``;

export default ExerciseListItem;
