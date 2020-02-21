import React, { useState, useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { MovementListContext } from '../context';
import { withAuthorization, withMovements } from '../context';

import { MovementList } from '../components/Movements';
import { FilterBar } from '../components/Movements';
// import { MovementFormButton } from '../components/Buttons';

import { sortMovements } from '../common/sortMovements';

import { IAuthUserContext } from '../common/types';
// import { FormMode } from '../common/enums';

const MovementsPage: NextPage = () => {
  const [filter, setFilter] = useState('');

  const movements = useContext(MovementListContext);
  const movementList = movements.loading
    ? null
    : [...movements.exercises, ...movements.workouts]
        .sort((a, b) => sortMovements(a, b))
        .filter((move) => move.name.includes(filter));

  return (
    <MovementsPageWrapper>
      <MovementList movementList={movementList} />
      <FilterBar filter={filter} setFilter={setFilter} />
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  height: 100%;
  /* max-width: 48rem;
  margin: 0 auto; */
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
