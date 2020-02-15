import React from 'react';
import styled from 'styled-components';

import { IExercise, IWorkout } from '../../common/types';
import { MovementType } from '../../common/enums';

export const ListItem = styled.li`
  background: ${({ theme }) => theme.color.neutral[100]};
  box-shadow: ${(props) => props.theme.shadow[1]};
  border-radius: 3px;
  display: grid;
  grid-auto-rows: auto 1fr auto;
  .color-bar {
    height: 7px;
    width: 100%;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .name {
    font-size: 16px;
    padding: 0.75rem 0.5rem;
  }
  .row {
    display: flex;
  }
  .btn-container {
    /* display: flex; */
    button {
      border: none;
    }
  }
`;

export default ListItem;
