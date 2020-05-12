import React, { useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { MovementListContext } from 'context';
import { withAuthorization, withMovements } from 'context';
import { useFilterState } from 'context/FilterContext';

import FilterBar from 'domain/FilterBar';
import Modal from 'domain/Modal';
import MovementMenu from 'components/MovementMenu';

import { sortMovements } from 'utils/sort-movements';

import { IAuthUserContext } from 'types/types';

const MovesPage: NextPage = () => {
  const filterState = useFilterState();

  const movements = useContext(MovementListContext);
  const moveList = movements.loading
    ? null
    : [...movements.exercises, ...movements.workouts]
        .sort((a, b) => sortMovements(a, b))
        .filter((move) =>
          move.name.toLowerCase().includes(filterState.value.toLowerCase()),
        )
        .filter((move) => {
          if (filterState.archs.length > 0) {
            return filterState.archs.every((arch) => move.tags.includes(arch));
          }
          return true;
        });

  const archetypeList = movements.loading ? null : [...movements.archetypes];

  return (
    <MovementsPageWrapper>
      <MovementMenu moveList={moveList} filterActive={filterState.active} />
      <FilterBar archetypeList={archetypeList} />
      <Modal />
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovesPage));
