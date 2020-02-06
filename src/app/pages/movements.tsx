import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { SearchContainer, MovementList } from '../components/Movements';
import { MovementFormButton } from '../components/Buttons';

import { withAuthorization, withMovements } from '../context';

import { IAuthUserContext } from '../common/types';
import { FormMode } from '../common/enums';

const MovementsPage: NextPage = () => {
  return (
    <MovementsPageWrapper>
      <SearchContainer />
      {/* <FilterBar />
      <ArchetypeRow /> */}
      <MovementList />

      {/* <MovementFormButton formMode={FormMode.Add} /> */}
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 1rem;
  height: 100%;
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
