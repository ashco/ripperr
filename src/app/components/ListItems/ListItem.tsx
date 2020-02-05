import React from 'react';
import styled from 'styled-components';

import { IExercise, IWorkout } from '../../common/types';
import { MovementType } from '../../common/enums';

export const ListItem = styled.li`
  /* height: ${(props) => props.theme.space[8]}; */
  /* margin-right: ${({ theme }) => theme.space[3]}; */
  /* margin: 0.5rem; */
  /* width: ${({ theme }) => theme.space[11]}; */
  width: auto;
  background: ${({ theme }) => theme.color.neutral[100]};
  box-shadow: ${(props) => props.theme.shadow[1]};
  border-radius: 3px;
  display: grid;
  grid-auto-rows: 3px 1fr auto;
  .color-bar {
    height: 3px;
    width: 100%;
  }
  .name {
    font-size: 16px;
    padding: 1rem 0.5rem;

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
