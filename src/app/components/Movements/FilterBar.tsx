import React from 'react';
import styled from 'styled-components';

import { MovementFormButton } from '../Buttons';
import { FormMode } from '../../common/enums';

export const FilterBar = () => {
  return (
    <FilterBarWrapper>
      <input className="filter-bar" type="text" placeholder="Filter..." />
      <div className="btn-container">
        <div id="dummy" />
        <MovementFormButton formMode={FormMode.Add} />
      </div>
    </FilterBarWrapper>
  );
};

const FilterBarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  gap: 1rem;
  margin: 1rem 1rem 0;
  input {
    font-size: 24px;
    padding: 0.5rem 1rem;
    box-shadow: ${(props) => props.theme.shadow[2]};
    border: none;
  }
  .btn-container {
    display: inline-block;
    position: relative;
    width: 100%;
    #dummy {
      margin-top: 100%;
    }
    button {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: ${(props) => props.theme.shadow[2]};
      border: none;
    }
  }
`;

// const StyledFilterBar = styled.input`
//   margin: 1rem 1rem 0;
//   font-size: 24px;
//   padding: 0.5rem;
// `;
