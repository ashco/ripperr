import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import WorkoutList from '../components/Workouts/WorkoutList';
import WorkoutFormButton from '../components/Workouts/WorkoutForm/WorkoutFormButton';
import { IWorkout, IExercise } from '../common/types';
import { WorkoutsContext, withWorkouts } from '../components/Workouts';
import { ExercisesContext, withExercises } from '../components/Exercises';

const WorkoutsPage: NextPage<{
  userAgent: string;
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const { workouts, woLoading } = useContext(WorkoutsContext);
  const { exercises } = useContext(ExercisesContext);

  return (
    <div>
      <h1>Workouts</h1>
      <WorkoutFormButton formMode="Add" exercises={exercises} />
      {woLoading && <div>Loading ...</div>}
      <WorkoutList workouts={workouts} exercises={exercises} />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(
  withWorkouts(withExercises(WorkoutsPage)),
);
