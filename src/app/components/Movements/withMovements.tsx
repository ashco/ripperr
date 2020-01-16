import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { MovementsState } from './index';

import {
  IExercise,
  IWorkout,
  IMovementsFirebaseQuery,
} from '../../common/types';

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

    const [movementState, setMovementState] = useState(INITIAL_MOVEMENT_STATE);

    useEffect(() => {
      const newState = { ...movementState };
      newState.loading.exercise = true;
      setMovementState();
      // setMovementState({ ...movementState, loading: { exercise: true } });

      if (authUser) {
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
            });

            setMovementState({
              ...movementState,
              loadingWo: false,
              workouts: workoutList,
            });

            return (): void => unsubscribeWo();
          });

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

            setMovementState({
              ...movementState,
              loadingEx: false,
              exercises: exerciseList,
            });

            return (): void => unsubscribeEx();
          });
      }
    }, []);

    return (
      <MovementsState.Provider value={movementState}>
        <Component {...props} />
      </MovementsState.Provider>
    );
  };

  return WithMovements;
};

export default withMovements;
