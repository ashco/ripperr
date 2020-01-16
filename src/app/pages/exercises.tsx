import { useState, useContext } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { ExercisesContext, withExercises } from '../components/Exercises';
import { IAuthUserContext } from '../components/Firebase/firebase';
import ExerciseList from '../components/Exercises/ExerciseList';
import ExerciseFormButton from '../components/Exercises/ExerciseForm/ExerciseFormButton';

import { FormMode } from '../common/enums';

const ExercisesPage: NextPage<{
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const exerciseState = useContext(ExercisesContext);
  const { exercises, exLoading } = exerciseState;

  return (
    <div>
      <h1>Exercises</h1>
      <ExerciseFormButton formMode={FormMode.Add} />
      {exLoading && <div>Loading ...</div>}
      <ExerciseList exercises={exercises} />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withExercises(ExercisesPage));
