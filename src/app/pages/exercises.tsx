import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { ExercisesContext, withExercises } from '../components/Exercises';
import { FirebaseContext } from '../components/Firebase';
import { IAuthUserContext } from '../components/Firebase/firebase';
import { Modal } from '../components/Modal';
import ExerciseForm from '../components/Exercises/ExerciseForm';
import ExerciseList from '../components/Exercises/ExerciseList';
import ExerciseFormButton from '../components/Exercises/ExerciseFormButton';
import { IExercise, IExercisePageState } from '../common/types';

const ExercisesPage: NextPage<{
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const exerciseState = useContext(ExercisesContext);
  const { exercises, exLoading } = exerciseState;

  return (
    <div>
      <h1>Exercises</h1>
      <ExerciseFormButton formMode="Add" />
      {exLoading && <div>Loading ...</div>}
      <ExerciseList exercises={exercises} />
    </div>
  );
};

// const NewExerciseFormButton = styled(ExerciseFormButton)`
//   button {
//     padding: 1rem;
//     position: fixed;
//     bottom: 2rem;
//     right: 2rem;
//   }
// `;

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(withExercises(ExercisesPage));
