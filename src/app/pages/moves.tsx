import React, { useState, useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { MovementListContext } from '../context';
import { withAuthorization, withMovements } from '../context';

import { MovementList } from '../components/Movements';
import { Filter } from '../components/Filter';

import { sortMovements } from '../common/sortMovements';

import { IAuthUserContext } from '../common/types';

const MovementsPage: NextPage = () => {
  const [filter, setFilter] = useState('');
  const [activeArchs, setActiveArchs] = useState<string[]>([]);

  const movements = useContext(MovementListContext);
  const movementList = movements.loading
    ? null
    : [...movements.exercises, ...movements.workouts]
        .sort((a, b) => sortMovements(a, b))
        .filter((move) =>
          move.name.toLowerCase().includes(filter.toLowerCase()),
        );

  const archetypeList = movements.loading
    ? null
    : [...movements.archetypes].sort((a, b) => sortMovements(a, b));

  return (
    <MovementsPageWrapper>
      <MovementList movementList={movementList} />
      <Filter
        filter={filter}
        setFilter={setFilter}
        archetypeList={archetypeList}
        activeArchs={activeArchs}
        setActiveArchs={setActiveArchs}
      />
      {/* <ArchetypeList
        archetypeList={archetypeList}
        activeArchs={activeArchs}
        setActiveArchs={setActiveArchs}
      />
      <FilterBar filter={filter} setFilter={setFilter} /> */}
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  height: 100%;
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
