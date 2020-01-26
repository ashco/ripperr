import React from 'react';
import styled from 'styled-components';

import { IExercise, IWorkout } from '../../common/types';
import { MovementType } from '../../common/enums';

export const ListItem = styled.div`
  margin-right: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[3]};
  width: ${({ theme }) => theme.space[11]};
  background: ${({ theme }) => theme.color.neutral[100]};
  box-shadow: ${(props) => props.theme.shadow[1]};
  border-radius: 3px;
  .color-bar {
    height: 3px;
    width: 100%;
  }
`;

// const ListItem: React.FC<{ movement: IExercise | IWorkout }> = ({
//   movement,
// }) => {
//   return (
//     <div>
//       <div className="color-bar" />
//       <strong>{movement.name}</strong>
//     </div>
//   );
// };

export default ListItem;
