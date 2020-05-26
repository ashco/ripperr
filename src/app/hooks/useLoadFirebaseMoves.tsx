import React from 'react';
import { useDispatch, batch } from 'store';
import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';

import { setMoves } from 'store/moves';

import {
  TagDict,
  TagId,
  ExerciseDict,
  ExerciseId,
  WorkoutDict,
  WorkoutId,
} from 'types';

function useLoadFirebaseMoves() {
  const dispatch = useDispatch();

  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);

  // TAG EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase.tags(authUser.uid).onSnapshot((snapshot) => {
        const tags: TagDict = {};
        snapshot.forEach((doc) => {
          tags[doc.id] = doc.data() as TagId;
        });

        batch(() => {
          dispatch(
            setMoves({
              tags,
            }),
          );
        });
        return (): void => unsubscribe();
      });
    }
  }, [authUser]);

  // EXERCISE EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase
        .exercises(authUser.uid)
        .onSnapshot((snapshot) => {
          const exercises: ExerciseDict = {};

          snapshot.forEach((doc) => {
            exercises[doc.id] = doc.data() as ExerciseId;
          });

          batch(() => {
            dispatch(
              setMoves({
                exercises,
              }),
            );
          });

          return (): void => unsubscribe();
        });
    }
  }, [authUser]);

  // WORKOUT EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase
        .workouts(authUser.uid)
        .onSnapshot((snapshot) => {
          const workouts: WorkoutDict = {};

          snapshot.forEach((doc) => {
            workouts[doc.id] = doc.data() as WorkoutId;
          });

          batch(() => {
            dispatch(
              setMoves({
                workouts,
              }),
            );
          });
          return (): void => unsubscribe();
        });
    }
  }, [authUser]);
}

export default useLoadFirebaseMoves;
