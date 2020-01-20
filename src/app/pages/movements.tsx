import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import MovementList from '../components/Movements/MovementList';
import { MovementFormButton } from '../components/Movements';

import { withAuthorization, withMovements } from '../context';

import { IAuthUserContext } from '../common/types';
import { FormMode } from '../common/enums';

const MovementsPage: NextPage<{
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  return (
    <div>
      <h1>Movements</h1>
      <StyledMovementFormButton formMode={FormMode.Add} />
      <MovementList />
    </div>
  );
};

const StyledMovementFormButton = styled(MovementFormButton)`
  button {
    background-color: red;
  }
`;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
