import React from 'react';
import { useDispatch } from 'store';
import { resetFilter } from 'store/filter';

import Button from 'components/Button';

import Icon from 'components/Icon';

const ClearFilterButton: React.FC = () => {
  const dispatch = useDispatch();

  function clearFilter() {
    dispatch(resetFilter());
  }

  return (
    <Button onClick={clearFilter}>
      <Icon name="times" width="1.5rem" />
    </Button>
  );
};

export default ClearFilterButton;
