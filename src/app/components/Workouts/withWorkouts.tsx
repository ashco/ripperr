import React, { useState, useEffect, useContext } from 'react';

import { FirebaseContext } from '../Firebase';
import { AuthUserContext } from '../Session';
import { WorkoutsContext } from './index';

import { IWorkout, IWorkoutsState } from '../../common/types';

export const INITIAL_WORKOUT_STATE: IWorkoutsState = {
  woLoading: false,
  workouts: [],
};

const withWorkouts = (Component: any) => {
  const WithWorkouts = (props: any) => {
    const firebase = useContext(FirebaseContext);
    const authUser = useContext(AuthUserContext);

    const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);

    useEffect(() => {
      setWorkoutState({ ...workoutState, woLoading: true });

      if (authUser) {
        const unsubscribe = firebase
          .workouts(authUser.uid)
          .onSnapshot((snapshot) => {
            const workoutList: IWorkout[] = [];

            snapshot.forEach((doc) => {
              const { id } = doc;
              const { name, mode, exercises } = doc.data();
              const obj: IWorkout = {
                woId: id,
                name,
                mode,
                exercises,
              };

              workoutList.push(obj);
            });

            setWorkoutState({
              woLoading: false,
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
