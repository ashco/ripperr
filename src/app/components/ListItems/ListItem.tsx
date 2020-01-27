﻿import React from 'react';
import styled from 'styled-components';

import { IExercise, IWorkout } from '../../common/types';
import { MovementType } from '../../common/enums';

export const ListItem = styled.li`
  /* margin-right: ${({ theme }) => theme.space[3]}; */
  margin: ${({ theme }) => theme.space[1]};
  width: ${({ theme }) => theme.space[11]};
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
    font-size: ${(p) => p.theme.font[4]};
    padding: ${(p) => p.theme.space[1]};
  }
  span.btn-row {
    display: flex;
    button {
      border: none;
    }
  }
`;

export default ListItem;
