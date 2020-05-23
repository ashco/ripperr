import React, { useContext } from 'react';
import { useDispatch, batch } from 'store';
import { NextPage } from 'next';
import styled from 'styled-components';

import withAuthorization from 'context/withAuthorization';
import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';

import { setMoves } from 'store/moves';

import Filter from 'features/Filter';

import MoveList from 'components/MoveList';

import {
  AuthUser,
  TagDict,
  Tag,
  ExerciseDict,
  Exercise,
  WorkoutDict,
  Workout,
} from 'types';

import ModalRouter from 'features/ModalRouter';

const MovesPage: NextPage = () => {
  const dispatch = useDispatch();

  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  // TAG EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase.tags(authUser.uid).onSnapshot((snapshot) => {
        const tags: TagDict = {};
        snapshot.forEach((doc) => {
          tags[doc.id] = doc.data() as Tag;
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
  }, []);

  // EXERCISE EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase
        .exercises(authUser.uid)
        .onSnapshot((snapshot) => {
          const exercises: ExerciseDict = {};

          snapshot.forEach((doc) => {
            exercises[doc.id] = doc.data() as Exercise;
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
  }, []);

  // WORKOUT EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase
        .workouts(authUser.uid)
        .onSnapshot((snapshot) => {
          const workouts: WorkoutDict = {};

          snapshot.forEach((doc) => {
            workouts[doc.id] = doc.data() as Workout;
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
  }, []);

  return (
    <MovementsPageWrapper>
      <MoveList />
      <Filter />
      <ModalRouter />
    </MovementsPageWrapper>
  );
};

const MovementsPageWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100%;
`;

const condition = (authUser: AuthUser): boolean => authUser !== null;

export default withAuthorization(condition)(MovesPage);
