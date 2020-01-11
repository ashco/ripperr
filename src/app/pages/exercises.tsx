import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { FirebaseContext } from '../components/Firebase';
import { IAuthUserContext } from '../components/Firebase/firebase';
import { Modal } from '../components/Modal';
import ExerciseForm from '../components/Exercises/ExerciseForm';
import ExerciseList from '../components/Exercises/ExerciseList';
import ExerciseFormButton from '../components/Exercises/ExerciseFormButton';
import { IExercise } from '../common/types';

interface IExercisePageState {
  loading: boolean;
  exercises: IExercise[];
}

const INITIAL_EXERCISE_STATE: IExercisePageState = {
  loading: false,
  exercises: [],
};

const ExercisesPage: NextPage<{
  userAgent: string;
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const firebase = useContext(FirebaseContext);
  const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);

  const { loading, exercises } = exerciseState;

  useEffect(() => {
    setExerciseState({ ...exerciseState, loading: true });

    if (authUser) {
      const unsubscribe = firebase
        .exercises(authUser.uid)
        .onSnapshot((snapshot) => {
          const exerciseList: IExercise[] = [];

          snapshot.forEach((doc) => {
            const { id } = doc;
            const { name } = doc.data();
            const exerciseObj: IExercise = {
              id,
              name,
            };

            exerciseList.push(exerciseObj);
          });

          setExerciseState({
            loading: false,
            exercises: exerciseList,
          });
        });

      return (): void => unsubscribe();
    } else {
      console.error('authUser is null');
    }
  }, []);

  return (
    <div>
      <h1>Exercises</h1>
      <ExerciseFormButton mode="Add" />
      {loading && <div>Loading ...</div>}
      <ExerciseList exercises={exercises} />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(ExercisesPage);
