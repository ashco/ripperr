import React, { useState, useEffect, useContext } from 'react';

import { AuthUserContext, FirebaseContext } from '.';
import { MovementsContext } from './index';

import {
  IArchetype,
  IExercise,
  IWorkout,
  IArchetypesFirebaseQuery,
  IExercisesFirebaseQuery,
  IWorkoutsFirebaseQuery,
  IMovementState,
} from '../common/types';

export const INITIAL_ARCHETYPE_STATE: IArchetypesFirebaseQuery = {
  loading: false,
  archetypes: [],
};

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
  archetypes: [],
  exercises: [],
  workouts: [],
};

const withMovements = (Component: any) => {
  const WithMovements = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    const [archetypeState, setArchetypeState] = useState(
      INITIAL_ARCHETYPE_STATE,
    );
    const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);
    const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);

    // ARCHETYPE EFFECT
    useEffect(() => {
      setArchetypeState({ ...archetypeState, loading: true });

      if (authUser) {
        const unsubscribe = firebase
          .archetypes(authUser.uid)
          .onSnapshot((snapshot) => {
            const archetypeList: IArchetype[] = [];

            snapshot.forEach((doc) => {
              const {
                lastModified,
                type,
                name,
                description,
                history,
              } = doc.data();
              const obj: IArchetype = {
                id: doc.id,
                lastModified,
                type,
                name,
                description,
                history,
              };

              archetypeList.push(obj);
            });

            setArchetypeState({
              loading: false,
              archetypes: archetypeList,
            });

            return (): void => unsubscribe();
          });
      }
    }, []);

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
                description,
                tags,
                history,
              } = doc.data();
              const obj: IExercise = {
                id: doc.id,
                lastModified,
                type,
                name,
                description,
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
                description,
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
                description,
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
      archetypes: archetypeState.archetypes,
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
