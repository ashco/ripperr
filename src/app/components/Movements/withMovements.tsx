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

    // EXERCISE EFFECT
    useEffect(() => {
      setExerciseState({ ...exerciseState, loading: true });

      if (authUser) {
        const unsubscribe = firebase
          .exercises(authUser.uid)
          .onSnapshot((snapshot) => {
            const exerciseList: IExercise[] = [];

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
              loading: false,
              exercises: exerciseList,
            });

            return (): void => unsubscribe();
          });
      }
    }, []);

    // WORKOUT EFFECT
    useEffect(() => {
      setWorkoutState({ ...workoutState, loading: true });

      if (authUser) {
        const unsubscribe = firebase
          .workouts(authUser.uid)
          .onSnapshot((snapshot) => {
            const workoutList: IWorkout[] = [];

            snapshot.forEach((doc) => {
              const {
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
            });

            setWorkoutState({
              loading: false,
              workouts: workoutList,
            });

            return (): void => unsubscribe();
          });
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
