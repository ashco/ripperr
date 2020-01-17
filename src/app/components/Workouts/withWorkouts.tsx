import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { WorkoutsContext } from './index';

import { IWorkout, IWorkoutsFirebaseQuery } from '../../common/types';

export const INITIAL_WORKOUT_STATE: IWorkoutsFirebaseQuery = {
  loading: false,
  workouts: [],
};

const withWorkouts = (Component: any) => {
  const WithWorkouts = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);

    useEffect(() => {
      setWorkoutState({ ...workoutState, loading: true });

      if (authUser) {
        const unsubscribe = firebase
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

            setWorkoutState({
              loading: false,
              workouts: workoutList,
            });

            return (): void => unsubscribe();
          });
      }
    }, []);

    return (
      <WorkoutsContext.Provider value={workoutState}>
        <Component {...props} />
      </WorkoutsContext.Provider>
    );
  };

  return WithWorkouts;
};

export default withWorkouts;
