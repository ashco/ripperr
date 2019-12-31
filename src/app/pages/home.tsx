import { useState } from 'react';
import { NextPage } from 'next';
import { withAuthorization } from '../components/Session';
import { InterfaceAuthUserContext } from '../components/Firebase/firebase';
import { Modal, ModalWrapper } from '../components/Modal';

const HomePage: NextPage<{ userAgent: string }> = () => {
  const [showModal, setShowModal] = useState(false);

  const hide = () => setShowModal(false);
  const show = () => setShowModal(true);

  const modal = showModal ? (
    <Modal>
      <ModalWrapper>
        <p>this works</p>
        <button onClick={hide}>Hide</button>
      </ModalWrapper>
    </Modal>
  ) : null;

  return (
    <div>
      <h1>Home world</h1>
      <p>The Home Page is accessible by every signed in user.</p>
      <button onClick={show}>Show</button>
      {modal}
    </div>
  );
};

const condition = (authUser: InterfaceAuthUserContext): boolean =>
  authUser !== null;

export default withAuthorization(condition)(HomePage);
