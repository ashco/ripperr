import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { MovementsContext } from './index';

import {
  IExercise,
  IWorkout,
  IExercisesFirebaseQuery,
  IWorkoutsFirebaseQuery,
  IMovementsFirebaseQuery,
} from '../../common/types';

// export const INITIAL_EXERCISE_STATE: IExercisesFirebaseQuery = {
//   loading: false,
//   exercises: [],
// };

// export const INITIAL_WORKOUT_STATE: IWorkoutsFirebaseQuery = {
//   loading: false,
//   workouts: [],
// };

export const INITIAL_MOVEMENT_STATE: IMovementsFirebaseQuery = {
  loading: false,
  exercises: [],
  workouts: [],
};

const withMovements = (Component: any) => {
  const WithMovements = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    const [movementState, setMovementState] = useState(INITIAL_MOVEMENT_STATE);

    useEffect(() => {
      setMovementState({
        ...movementState,
        loading: true,
      });

      if (authUser) {
        const exerciseList: IExercise[] = [];
        const workoutList: IWorkout[] = [];

        const unsubscribeEx = firebase
          .exercises(authUser.uid)
          .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const { id } = doc;
              const { name, notes, tags, history } = doc.data();
              const obj: IExercise = {
                id,
                name,
                notes,
                tags,
                history,
              };

              exerciseList.push(obj);
            });

            return (): void => unsubscribeEx();
          });

        const unsubscribeWo = firebase
          .workouts(authUser.uid)
          .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const { id } = doc;
              const {
                name,
                notes,
                tags,
                history,
                mode,
                movements,
                rest,
                config,
              } = doc.data();

              const obj: IWorkout = {
                id,
                name,
                notes,
                tags,
                history,
                mode,
                movements,
                rest,
                config,
              };

              workoutList.push(obj);

              return (): void => unsubscribeWo();
            });
          });

        setMovementState({
          exercises: exerciseList,
          workouts: workoutList,
          loading: false,
        });
      } else {
        console.log('No authUser!');
      }
    }, []);

    return (
      <MovementsContext.Provider value={movementState}>
        <Component {...props} />
      </MovementsContext.Provider>
    );
  };

  return WithMovements;
};

export default withMovements;
