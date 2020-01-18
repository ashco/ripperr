import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { MovementsContext } from './index';

import {
  IExercise,
  IWorkout,
  IExercisesFirebaseQuery,
  IWorkoutsFirebaseQuery,
  IMovementState,
} from '../../common/types';

export const INITIAL_EXERCISE_STATE: IExercisesFirebaseQuery = {
  loading: false,
  exercises: [],
};

export const INITIAL_WORKOUT_STATE: IWorkoutsFirebaseQuery = {
  loading: false,
  workouts: [],
};

export const INITIAL_MOVEMENT_STATE: IMovementState = {
  loading: false,
  exercises: [],
  workouts: [],
};

const withMovements = (Component: any) => {
  const WithMovements = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);
    const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);

    useEffect(() => {
      setExerciseState({
        // ...exerciseState,
        exercises: [],
        loading: true,
      });

      setWorkoutState({
        // ...workoutState,
        workouts: [],
        loading: true,
      });

      if (authUser) {
        const exerciseList: IExercise[] = [];
        const workoutList: IWorkout[] = [];

        const unsubscribeEx = firebase
          .exercises(authUser.uid)
          .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const {
                lastModified,
                type,
                name,
                notes,
                tags,
                history,
              } = doc.data();

              const obj: IExercise = {
                id: doc.id,
                lastModified,
                type,
                name,
                notes,
                tags,
                history,
              };

              exerciseList.push(obj);
            });

            setExerciseState({
              exercises: exerciseList,
              loading: false,
            });

            return (): void => unsubscribeEx();
          });

        const unsubscribeWo = firebase
          .workouts(authUser.uid)
          .onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
              const {
                lastModified,
                name,
                type,
                notes,
                tags,
                history,
                mode,
                movements,
                rest,
                config,
              } = doc.data();

              const obj: IWorkout = {
                id: doc.id,
                lastModified,
                type,
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

              setWorkoutState({
                workouts: workoutList,
                loading: false,
              });

              return (): void => unsubscribeWo();
            });
          });
      } else {
        console.log('No authUser!');
      }
    }, []);

    const movementState: IMovementState = {
      exercises: exerciseState.exercises,
      workouts: workoutState.workouts,
      loading: exerciseState.loading || workoutState.loading,
    };

    return (
      <MovementsContext.Provider value={movementState}>
        <Component {...props} />
      </MovementsContext.Provider>
    );
  };

  return WithMovements;
};

export default withMovements;
