import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { MovementList } from '../components/Movements';
import { FilterBar } from '../components/Movements';
// import { MovementFormButton } from '../components/Buttons';

import { withAuthorization, withMovements } from '../context';

import { IAuthUserContext } from '../common/types';
// import { FormMode } from '../common/enums';

const MovementsPage: NextPage = () => {
  return (
    <MovementsPageWrapper>
      <MovementList />
      <FilterBar />
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
