import React from 'react';
import styled from 'styled-components';

import { useModalDispatch } from '../../context/ModalContext';
import { useMoveDispatch } from '../../context/MoveContext';

import ColorBarContainer from '../Containers/ColorBarContainer';
import { ListItemMenuButton as OptionMenuButton } from '../Buttons';

import { Movement } from '../../types/types';
import { MovementType } from '../../types/enums';

const MenuListItem: React.FC<{ movement: Movement }> = ({ movement }) => {
  const modalDispatch = useModalDispatch();
  const moveDispatch = useMoveDispatch();

  const btnRef = React.useRef<HTMLDivElement>(null);

  // Determine ColorBar color
  let color;
  switch (movement.type) {
    case MovementType.Archetype:
      color = 'orange';
      break;
    case MovementType.Exercise:
      color = 'purple';
      break;
    case MovementType.Workout:
      color = 'blue';
      break;
    default:
      break;
  }

  function handleView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      modalDispatch({ type: 'MODAL_VIEW' });
      moveDispatch({ type: 'MOVE_SET', value: movement });
    }
  }

  const listItem = (
    <ColorBarContainer color={color}>
      <MenuListItemWrapper onClick={handleView}>
        <div className="left">
          <p className="name">{movement.name}</p>
        </div>
        <div className="right">
          <div ref={btnRef} className="option-menu-btn-wrapper">
            <OptionMenuButton movement={movement} />
          </div>
        </div>
      </MenuListItemWrapper>
    </ColorBarContainer>
  );

  if (movement.type === MovementType.Workout) {
    return <WorkoutTypeWrapper>{listItem}</WorkoutTypeWrapper>;
  }
  return listItem;
};

const WorkoutTypeWrapper = styled.div`
  grid-area: auto / auto / span 2 / span 2;
  > div {
    height: 100%;
  }
`;

const MenuListItemWrapper = styled.div`
  background: ${({ theme }) => theme.mode.background[300]};
  box-shadow: ${(props) => props.theme.shadow[1]};
  display: grid;
  grid-template-columns: 1fr auto;
  cursor: pointer;
  .left {
    p.name {
      font-size: 16px;
      padding: 0.75rem 0.5rem;
      color: ${(props) => props.theme.mode.color[100]};
      font-weight: 600;
      line-height: 1.15;
    }
  }
  .right {
    display: grid;
    .option-menu-btn-wrapper {
      align-self: end;
    }
  }
`;

export default MenuListItem;
