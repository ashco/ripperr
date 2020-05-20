import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'store';
import { NextPage } from 'next';
import styled from 'styled-components';

// import MovementListContext from 'context/MovementListContext';
import withAuthorization from 'context/withAuthorization';
import AuthUserContext from 'context/AuthUserContext';
// import withMovements from 'context/withMovements';
import FirebaseContext from 'context/FirebaseContext';

import { getMovesStart, getMovesSuccess, getMovesFailure } from 'store/moves';

import Filter from 'features/Filter';

import MovementMenu from 'components/MovementMenu';

import { sortMovements } from 'utils/sort-movements';

import { AuthUser } from 'types/types';

import ModalRouter from 'features/ModalRouter';

const MovesPage: NextPage = () => {
  const dispatch = useDispatch();

  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const filter = useSelector((state) => state.filter);
  // const moves = useSelector((state) => state.moves);

  // const movements = useContext(MovementListContext);
  // const moveList = movements.loading
  //   ? null
  //   : [...movements.exercises, ...movements.workouts]
  //       .sort((a, b) => sortMovements(a, b))
  //       .filter((move) =>
  //         move.name.toLowerCase().includes(filter.value.toLowerCase()),
  //       )
  //       .filter((move) => {
  //         if (filter.tags.length > 0) {
  //           return filter.tags.every((arch) => move.tags.includes(arch));
  //         }
  //       }, []);

  // ARCHETYPE EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase.tags(authUser.uid).onSnapshot((snapshot) => {
        const tags: any = {};

        snapshot.forEach((doc) => {
          tags[doc.id] = doc.data();
        });

        dispatch(
          getMovesSuccess({
            tags,
          }),
        );
      });

      return (): void => unsubscribe();
    }
  }, []);

  // EXERCISE EFFECT
  React.useEffect(() => {
    if (authUser) {
      const unsubscribe = firebase
        .exercises(authUser.uid)
        .onSnapshot((snapshot) => {
          const exercises: any = {};

          snapshot.forEach((doc) => {
            exercises[doc.id] = doc.data();
          });

          dispatch(
            getMovesSuccess({
              exercises,
            }),
          );
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
          const workouts: any = {};

          snapshot.forEach((doc) => {
            workouts[doc.id] = doc.data();
          });

          dispatch(
            getMovesSuccess({
              workouts,
            }),
          );

          return (): void => unsubscribe();
        });
    }
  }, []);

  return (
    <MovementsPageWrapper>
      <MovementMenu filterActive={filter.active} />
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
