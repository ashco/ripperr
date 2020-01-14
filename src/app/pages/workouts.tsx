import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import { withAuthorization } from '../components/Session';
import { IAuthUserContext } from '../components/Firebase/firebase';
import { Modal } from '../components/Modal';
import WorkoutForm from '../components/Workouts/WorkoutForm/WorkoutForm';
import WorkoutList from '../components/Workouts/WorkoutList';
import WorkoutFormButton from '../components/Workouts/WorkoutForm/WorkoutFormButton';
import { IWorkout, IExercise } from '../common/types';

// import { INITIAL_EXERCISE_STATE } from './exercises';
import { FirebaseContext } from '../components/Firebase';
interface IWorkoutState {
  woLoading: boolean;
  workouts: IWorkout[];
}

const INITIAL_WORKOUT_STATE: IWorkoutState = {
  woLoading: false,
  workouts: [],
};

const WorkoutsPage: NextPage<{
  userAgent: string;
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const firebase = useContext(FirebaseContext);

  // Load workouts from firebase
  const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);
  const { woLoading, workouts } = workoutState;

  useEffect(() => {
    setWorkoutState({ ...workoutState, woLoading: true });

    if (authUser) {
      const unsubscribe = firebase
        .workouts(authUser.uid)
        .onSnapshot((snapshot) => {
          const workouts: IWorkout[] = [];

          snapshot.forEach((doc) => {
            const { id } = doc;
            const { name, mode, exercises } = doc.data();
            const workoutObj: IWorkout = {
              woId: id,
              name,
              mode,
              exercises,
            };

            workouts.push(workoutObj);
          });

          setWorkoutState({
            woLoading: false,
            workouts,
          });
        });

      return (): void => unsubscribe();
    } else {
      console.error('authUser is null');
    }
  }, []);

  // Load exercises from firebase
  const [exercises, setExercises] = useState<IExercise[]>([]);

  useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase
        .exercises(authUser.uid)
        .onSnapshot((snapshot) => {
          const exerciseArr: IExercise[] = [];

          snapshot.forEach((doc) => {
            const { id } = doc;
            const { name } = doc.data();
            const exerciseObj: IExercise = {
              exId: id,
              name,
            };

            exerciseArr.push(exerciseObj);
          });

          setExercises(exerciseArr);
        });

      return (): void => unsubscribe();
    } else {
      console.error('authUser is null');
    }
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      <WorkoutFormButton formMode="Add" exercises={exercises} />
      {woLoading && <div>Loading ...</div>}
      <WorkoutList workouts={workouts} exercises={exercises} />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(WorkoutsPage);
