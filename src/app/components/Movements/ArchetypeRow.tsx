﻿import React, { useContext } from 'react';
import styled from 'styled-components';

import { MovementsContext } from '../../context';

import { ArchetypeListItem } from '../ListItems';

import { sortMovements } from '../../common/sortMovements';

export const ArchetypeRow: React.FC = () => {
  const movements = useContext(MovementsContext);

  const archetypeList = [...movements.archetypes].sort((a, b) =>
    sortMovements(a, b),
  );

  return (
    <MovementListWrapper>
      {movements.loading ? (
        <div>Loading ...</div>
      ) : archetypeList.length === 0 ? (
        <div>Create an Archetype today!</div>
      ) : (
        archetypeList.map((arch) => (
          <ArchetypeListItem key={arch.id} archetype={arch} />
        ))
      )}
    </MovementListWrapper>
  );
};

const MovementListWrapper = styled.ul`
  display: flex;
  justify-content: center;
`;
