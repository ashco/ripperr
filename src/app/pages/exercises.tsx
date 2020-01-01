import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { withAuthorization } from '../components/Session';
import { FirebaseContext } from '../components/Firebase';
import { InterfaceAuthUserContext } from '../components/Firebase/firebase';
// import { Modal, ModalWrapper } from '../components/Modal';
import ExerciseFormModal from '../components/Modal/ExercisesFormModal';
import ExerciseList from '../components/Exercises/ExerciseList';

export interface InterfaceExercise {
  name: string;
}

interface InterfaceExerciseState {
  loading: boolean;
  exercises: InterfaceExercise[];
}

const INITIAL_EXERCISE_STATE: InterfaceExerciseState = {
  loading: false,
  exercises: [],
};

const ExercisesPage: NextPage<{ userAgent: string; authUser: any }> = ({
  authUser,
}) => {
  const firebase = useContext(FirebaseContext);
  const [showModal, setShowModal] = useState(false);
  const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);

  const { loading, exercises } = exerciseState;

  const hide = () => setShowModal(false);
  const show = () => setShowModal(true);

  useEffect(() => {
    setExerciseState({ ...exerciseState, loading: true });

    const unsubscribe = firebase
      .exercises(authUser.uid)
      .onSnapshot(snapshot => {
        const exerciseList: InterfaceExercise[] = [];

        snapshot.forEach(doc => {
          const { name } = doc.data();
          const exerciseObj: InterfaceExercise = {
            name,
          };

          exerciseList.push(exerciseObj);
        });

        setExerciseState({
          loading: false,
          exercises: exerciseList,
        });
      });

    return (): void => unsubscribe();
  }, []);

  const modal = showModal ? (
    // <Modal>
    //   <ModalWrapper>
    <ExerciseFormModal hide={hide} authUser={authUser} />
  ) : //   </ModalWrapper>
  // </Modal>
  null;

  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={show}>Show</button>
      {loading && <div>Loading ...</div>}
      <ExerciseList exercises={exercises} />
      {modal}
    </div>
  );
};

const condition = (authUser: InterfaceAuthUserContext): boolean =>
  authUser !== null;

export default withAuthorization(condition)(ExercisesPage);
