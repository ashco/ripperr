import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import WorkoutList from '../components/Movements/WorkoutList';
import MovementsFormButton from '../components/Movements/WorkoutForm/MovementsFormButton';
import { MovementsContext, withMovements } from '../components/Movements';
// import { ExercisesContext, withExercises } from '../components/Exercises';

import { FormMode } from '../common/enums';

const MovementsPage: NextPage<{
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  // const { workouts, woLoading } = useContext(WorkoutsContext);
  // const { exercises } = useContext(ExercisesContext);

  return (
    <div>
      <h1>Movements</h1>
      {/* <MovementsFormButton formMode={FormMode.Add} exercises={exercises} /> */}
      {/* {woLoading && <div>Loading ...</div>} */}
      {/* <WorkoutList workouts={workouts} exercises={exercises} /> */}
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withMovements(MovementsPage));
