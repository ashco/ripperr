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

export const INITIAL_EXERCISE_STATE: IExercisesFirebaseQuery = {
  loading: false,
  exercises: [],
};

export const INITIAL_WORKOUT_STATE: IWorkoutsFirebaseQuery = {
  loading: false,
  workouts: [],
};

export const INITIAL_MOVEMENT_STATE: IMovementsFirebaseQuery = {
  loading: {
    exercise: false,
    workout: false,
  },
  exercises: [],
  workouts: [],
};

const withMovements = (Component: any) => {
  const WithMovements = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    // const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);
    // const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);
    const [movementState, setMovementState] = useState(INITIAL_MOVEMENT_STATE);

    // Exercises
    useEffect(() => {
      const newState = { ...movementState };
      newState.loading = {
        exercise: true,
        workout: true,
      };

      setMovementState(newState);

      if (authUser) {
        const unsubscribeEx = firebase
          .exercises(authUser.uid)
          .onSnapshot((snapshot) => {
            const exerciseList: IExercise[] = [];

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

            const newWoState = { ...movementState };
            newWoState.exercises = exerciseList;
            newWoState.loading.exercise = false;
            setMovementState(newWoState);

            return (): void => unsubscribeEx();
          });

        const unsubscribeWo = firebase
          .workouts(authUser.uid)
          .onSnapshot((snapshot) => {
            const workoutList: IWorkout[] = [];

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

              const newWoState = { ...movementState };
              newWoState.workouts = workoutList;
              newWoState.loading.workout = false;
              setMovementState(newWoState);

              return (): void => unsubscribeWo();
            });
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
