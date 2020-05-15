import React from 'react';
import { useDispatch } from 'store';

import Button from 'components/Button';

import Icon from 'icons';

const ClearFilterButton: React.FC = () => {
  const dispatch = useDispatch();

  function clearFilter() {
    dispatch({ type: 'FILTER_RESET' });
  }

  return (
    <Button onClick={clearFilter}>
      <Icon name="times" width="1.5rem" />
    </Button>
  );
};

export default ClearFilterButton;
