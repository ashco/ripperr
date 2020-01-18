import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { ExercisesContext } from './index';

import { IExercise, IExercisesFirebaseQuery } from '../../common/types';

export const INITIAL_EXERCISE_STATE: IExercisesFirebaseQuery = {
  loading: false,
  exercises: [],
};

const withExercises = (Component: any) => {
  const WithExercises = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);

    useEffect(() => {
      setExerciseState({ ...exerciseState, loading: true });

      if (authUser) {
        const unsubscribe = firebase
          .exercises(authUser.uid)
          .onSnapshot((snapshot) => {
            const exerciseList: IExercise[] = [];

            snapshot.forEach((doc) => {
              const { id } = doc;
              const { type, name, notes, tags, history } = doc.data();
              // const obj: IExercise = {
              //   id,
              //   type,
              //   name,
              //   notes,
              //   tags,
              //   history,
              // };

              // exerciseList.push(obj);
            });

            setExerciseState({
              loading: false,
              exercises: exerciseList,
            });

            return (): void => unsubscribe();
          });
      }
    }, []);

    return (
      <ExercisesContext.Provider value={exerciseState}>
        <Component {...props} />
      </ExercisesContext.Provider>
    );
  };

  return WithExercises;
};

export default withExercises;
