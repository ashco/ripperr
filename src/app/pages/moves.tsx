import React, { useContext } from 'react';
import { useSelector } from 'store';
import { NextPage } from 'next';
import styled from 'styled-components';

import { MovementListContext } from 'context';
import { withAuthorization, withMovements } from 'context';

import Filter from 'domain/Filter';

import MovementMenu from 'components/MovementMenu';

import { sortMovements } from 'utils/sort-movements';

import { IAuthUserContext } from 'types/types';

import ModalRouter from 'domain/ModalRouter';

const MovesPage: NextPage = () => {
  const filter = useSelector((state) => state.filter);

  const movements = useContext(MovementListContext);
  const moveList = movements.loading
    ? null
    : [...movements.exercises, ...movements.workouts]
        .sort((a, b) => sortMovements(a, b))
        .filter((move) =>
          move.name.toLowerCase().includes(filter.value.toLowerCase()),
        )
        .filter((move) => {
          if (filter.tags.length > 0) {
            return filter.tags.every((arch) => move.tags.includes(arch));
          }
          return true;
        });

  const archetypeList = movements.loading ? null : [...movements.archetypes];

  return (
    <MovementsPageWrapper>
      <MovementMenu moveList={moveList} filterActive={filter.active} />
      <Filter archetypeList={archetypeList} />
      <ModalRouter />
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
