import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import WorkoutList from '../components/Workouts/WorkoutList';
import WorkoutFormButton from '../components/Workouts/WorkoutForm/WorkoutFormButton';
import { WorkoutsContext, withWorkouts } from '../components/Workouts';
import { ExercisesContext, withExercises } from '../components/Exercises';

import { FormMode } from '../common/enums';

const WorkoutsPage: NextPage<{
  userAgent: string;
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const { workouts, woLoading } = useContext(WorkoutsContext);
  const { exercises } = useContext(ExercisesContext);

  return (
    <div>
      <h1>Workouts</h1>
      <WorkoutFormButton formMode={FormMode.Add} exercises={exercises} />
      {woLoading && <div>Loading ...</div>}
      <WorkoutList workouts={workouts} exercises={exercises} />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(
  withWorkouts(withExercises(WorkoutsPage)),
);
