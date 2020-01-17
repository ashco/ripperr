import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import MovementList from '../components/Movements/MovementList';
// import MovementsFormButton from '../components/Movements/WorkoutForm/MovementsFormButton';
import { MovementsContext, withMovements } from '../components/Movements';
// import { ExercisesContext, withExercises } from '../components/Exercises';

import { FormMode } from '../common/enums';

const MovementsPage: NextPage<{
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const movements = useContext(MovementsContext);
  // const { exercises, workouts } = movements;

  return (
    <div>
      <h1>Movements</h1>
      {/* <MovementsFormButton formMode={FormMode.Add} exercises={exercises} /> */}
      {movements.loading && <div>Loading ...</div>}
      <MovementList
        movements={movements}
        // exercises={exercises}
        // workouts={workouts}
      />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
