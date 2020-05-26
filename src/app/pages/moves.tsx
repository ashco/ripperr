import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import withAuthorization from 'context/withAuthorization';

import Filter from 'features/Filter';

import MoveList from 'components/MoveList';
import useLoadFirebaseMoves from 'hooks/useLoadFirebaseMoves';

import { AuthUser } from 'types';

import ModalRouter from 'features/ModalRouter';

const MovesPage: NextPage = () => {
  useLoadFirebaseMoves();

  return (
    <MovementsPageWrapper>
      <MoveList />
      <Filter />
      <ModalRouter />
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const condition = (authUser: AuthUser): boolean => authUser !== null;

export default withAuthorization(condition)(MovesPage);
