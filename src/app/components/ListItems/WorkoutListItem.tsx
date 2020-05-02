import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';
import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import { ListItem } from './index';
import { ListItemMenuButton } from '../Button';
import ColorBarContainer from '@/components/ColorBarContainer';

import { Workout } from '../../types/types';
import { MovementType } from '../../types/enums';

const WorkoutListItem: React.FC<{ workout: Workout }> = ({ workout }) => {
  const themeContext = useContext(ThemeContext);
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  const btnRef = useRef<HTMLDivElement>(null);

  function handleView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      modalDispatch({ type: 'MODAL_VIEW' });
      moveDispatch({ type: 'MOVE_SET', value: workout });
    }
  }
  // <WorkoutListItemWrapper onClick={handleView}>
  {
    /* <ColorBarContainer color={themeContext.color.blue[500]}> */
  }

  return (
    <WorkoutListItemWrapper>
      <ColorBarContainer type="thin" color="blue">
        <ListItem onClick={handleView}>
          <p className="name">{workout.name}</p>
          <div className="list-item-menu-container">
            <div ref={btnRef} className="btn-wrapper">
              <ListItemMenuButton movement={workout} />
            </div>
          </div>
        </ListItem>
      </ColorBarContainer>
    </WorkoutListItemWrapper>
  );
};

const WorkoutListItemWrapper = styled.div`
  grid-area: auto / auto / span 2 / span 2;
  > div {
    height: 100%;
  }
`;

export default WorkoutListItem;
