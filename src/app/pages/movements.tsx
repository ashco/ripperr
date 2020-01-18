﻿import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import MovementList from '../components/Movements/MovementList';
import { MovementFormButton } from '../components/Movements';
import { MovementsContext, withMovements } from '../components/Movements';
// import { ExercisesContext, withExercises } from '../components/Exercises';

import { FormMode } from '../common/enums';

const MovementsPage: NextPage<{
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  return (
    <div>
      <h1>Movements</h1>
      <MovementFormButton formMode={FormMode.Add} />
      <MovementList />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
