﻿import React, { useState, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { useFilterState, useFilterDispatch } from '../../context/FilterContext';

import { Button } from '.';

import Times from '../../icons/Times';

const ClearFilterButton: React.FC = () => {
  // const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();

  // const filtering =
  //   filterState.value.length > 0 || filterState.archs.length > 0;

  const themeContext = useContext(ThemeContext);
  const [btnHovered, setBtnHovered] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  function toggleHover() {
    setBtnHovered((hovered) => !hovered);
  }

  function clearFilter() {
    filterDispatch({ type: 'FILTER_RESET' });
  }

  return (
    <StyledClearFilterButton
      onClick={clearFilter}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      ref={btnRef}
    >
      {/* <div>X</div> */}
      {/* {filtering ? (
      ) : ( */}
      <Times
        color={
          btnHovered
            ? themeContext.mode.background[200]
            : themeContext.mode.color[200]
        }
      />
      {/* )} */}
    </StyledClearFilterButton>
  );
};

const StyledClearFilterButton = styled(Button)`
  display: grid;
  place-items: center;
  background-color: ${(props) => props.theme.mode.background[300]};
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadow[2]};
  border: none;
  svg {
    width: 1.25rem;
  }
`;

export default ClearFilterButton;