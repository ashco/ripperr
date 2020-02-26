﻿import React, { useState, useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { MovementListContext } from '../context';
import { withAuthorization, withMovements } from '../context';
import { FilterProvider, useFilterState } from '../context/FilterContext';

import { MovementList } from '../components/Movements';
import { Filter } from '../components/Filter';

import { sortMovements } from '../common/sortMovements';

import { IAuthUserContext } from '../common/types';

const MovesPage: NextPage = () => {
  const filterState = useFilterState();

  const movements = useContext(MovementListContext);
  const moveList = movements.loading
    ? null
    : [...movements.exercises, ...movements.workouts]
        .sort((a, b) => sortMovements(a, b))
        .filter((move) =>
          move.name.toLowerCase().includes(filterState.value.toLowerCase()),
        );

  const archetypeList = movements.loading
    ? null
    : [...movements.archetypes].sort((a, b) => sortMovements(a, b));

  return (
    <MovementsPageWrapper>
      <MovementList moveList={moveList} />
      <Filter archetypeList={archetypeList} />
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  /* gap: 1rem; */
  height: 100%;
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovesPage));
