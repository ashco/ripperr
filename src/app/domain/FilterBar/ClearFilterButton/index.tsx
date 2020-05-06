import React from 'react';
import styled, { ThemeContext } from 'styled-components';

import { useFilterDispatch } from 'context/FilterContext';

import Button from 'components/Button';

import Icon from 'icons';

const ClearFilterButton: React.FC = () => {
  const filterDispatch = useFilterDispatch();

  function clearFilter() {
    filterDispatch({ type: 'FILTER_RESET' });
  }

  return (
    <Button onClick={clearFilter}>
      <Icon name="times" width="1.5rem" />
    </Button>
  );
};

// const StyledClearFilterButton = styled(Button)`
//   &:hover {
//     svg path {
//       fill: ${(props) => props.theme.mode.background[200]};
//     }
//   }
// `;

export default ClearFilterButton;
