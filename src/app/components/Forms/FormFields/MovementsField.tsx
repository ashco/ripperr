import React from 'react';
import styled from 'styled-components';

import { IMovementRefs } from '../../../common/types';

const MovementsField: React.FC<{
  movements: IMovementRefs[];
}> = ({ movements }) => {
  return (
    <MovementsFieldWrapper>
      {movements.map((move) => {
        return <div key={move.id}>{move.name}</div>;
      })}
    </MovementsFieldWrapper>
  );
};

const MovementsFieldWrapper = styled.div``;

export default MovementsField;
