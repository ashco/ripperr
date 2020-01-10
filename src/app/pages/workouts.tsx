import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { withAuthorization } from '../components/Session';
import { FirebaseContext } from '../components/Firebase';
import { IAuthUserContext } from '../components/Firebase/firebase';
import { Modal } from '../components/Modal';
import WorkoutFormModal from '../components/Workouts/WorkoutFormModal';
import WorkoutList from '../components/Workouts/WorkoutList';
import WorkoutFormButton from '../components/Workouts/WorkoutFormButton';
import { IWorkout } from '../common/types';

interface IWorkoutState {
  loading: boolean;
  workouts: IWorkout[];
}

const INITIAL_WORKOUT_STATE: IWorkoutState = {
  loading: false,
  workouts: [],
};

const WorkoutsPage: NextPage<{
  userAgent: string;
  authUser: IAuthUserContext;
}> = ({ authUser }) => {
  const firebase = useContext(FirebaseContext);
  const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);

  const { loading, workouts } = workoutState;

  useEffect(() => {
    setWorkoutState({ ...workoutState, loading: true });

    if (authUser) {
      const unsubscribe = firebase
        .workouts(authUser.uid)
        .onSnapshot((snapshot) => {
          const workouts: IWorkout[] = [];

          snapshot.forEach((doc) => {
            const { id } = doc;
            const { name } = doc.data();
            const workoutObj: IWorkout = {
              id,
              name,
            };

            workouts.push(workoutObj);
          });

          setWorkoutState({
            loading: false,
            workouts,
          });
        });

      return (): void => unsubscribe();
    } else {
      console.error('authUser is null');
    }
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      <WorkoutFormButton mode="Add" />
      {loading && <div>Loading ...</div>}
      <WorkoutList workouts={workouts} />
    </div>
  );
};

const condition = (authUser: IAuthUserContext): boolean => authUser !== null;

export default withAuthorization(condition)(WorkoutsPage);
