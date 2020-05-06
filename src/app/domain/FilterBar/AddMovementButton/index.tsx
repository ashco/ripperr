import React from 'react';

import Button from 'components/Button';

import Icon from 'icons';

const AddMovementButton: React.FC<{ openModal: () => void }> = ({
  openModal,
}) => {
  return (
    <Button onClick={openModal}>
      <Icon name="plus" />
    </Button>
  );
};

export default AddMovementButton;
