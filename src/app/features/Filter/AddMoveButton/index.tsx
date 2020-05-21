import React from 'react';

import Button from 'components/Button';

import Icon from 'components/Icon';

const AddMoveButton: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <Button onClick={openModal} aria-label="Add Move">
      <Icon name="plus" />
    </Button>
  );
};

export default AddMoveButton;
