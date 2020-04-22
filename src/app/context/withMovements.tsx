import React, { useState, useEffect, useContext } from 'react';

import { AuthUserContext, FirebaseContext } from '.';
import { MovementListContext } from './index';

import {
  Archetype,
  Exercise,
  Workout,
  IArchetypesFirebaseQuery,
  IExercisesFirebaseQuery,
  IWorkoutsFirebaseQuery,
  IMovementState,
} from '../common/types';

export const INITIAL_ARCHETYPE_STATE: IArchetypesFirebaseQuery = {
  loading: true,
  archetypes: [],
};

export const INITIAL_EXERCISE_STATE: IExercisesFirebaseQuery = {
  loading: true,
  exercises: [],
};

export const INITIAL_WORKOUT_STATE: IWorkoutsFirebaseQuery = {
  loading: true,
  workouts: [],
};

export const INITIAL_MOVEMENT_STATE: IMovementState = {
  loading: true,
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
            const archetypeList: Archetype[] = [];

            snapshot.forEach((doc) => {
              const {
                lastModified,
                type,
                name,
                description,
                // history,
              } = doc.data();
              const obj: Archetype = {
                id: doc.id,
                lastModified,
                type,
                name,
                description,
                // history,
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
            const exerciseList: Exercise[] = [];

            snapshot.forEach((doc) => {
              const {
                lastModified,
                type,
                name,
                description,
                tags,
                // history,
              } = doc.data();
              const obj: Exercise = {
                id: doc.id,
                lastModified,
                type,
                name,
                description,
                tags,
                // history,
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
            const workoutList: Workout[] = [];

            snapshot.forEach((doc) => {
              const {
                lastModified,
                type,
                name,
                description,
                tags,
                // history,
                mode,
                movements,
                rest,
                config,
              } = doc.data();

              const obj: Workout = {
                id: doc.id,
                lastModified,
                type,
                name,
                description,
                tags,
                // history,
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

    const moveState: IMovementState = {
      archetypes: archetypeState.archetypes,
      exercises: exerciseState.exercises,
      workouts: workoutState.workouts,
      loading: exerciseState.loading || workoutState.loading,
    };

    return (
      <MovementListContext.Provider value={moveState}>
        <Component {...props} />
      </MovementListContext.Provider>
    );
  };

  return WithMovements;
};

export default withMovements;
