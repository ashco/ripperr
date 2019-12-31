import { useState } from 'react';
import { NextPage } from 'next';
import { withAuthorization } from '../components/Session';
import { InterfaceAuthUserContext } from '../components/Firebase/firebase';
import { Modal, ModalWrapper } from '../components/Modal';
import ExercisesForm from '../components/Exercises/ExercisesForm';

const ExercisesPage: NextPage<{ userAgent: string }> = () => {
  const [showModal, setShowModal] = useState(false);

  const hide = () => setShowModal(false);
  const show = () => setShowModal(true);

  const modal = showModal ? (
    <Modal>
      <ModalWrapper>
        <ExercisesForm hide={hide} />
      </ModalWrapper>
    </Modal>
  ) : null;

  return (
    <div>
      <h1>Exercises</h1>
      <button onClick={show}>Show</button>
      {modal}
    </div>
  );
};

const condition = (authUser: InterfaceAuthUserContext): boolean =>
  authUser !== null;

export default withAuthorization(condition)(ExercisesPage);
