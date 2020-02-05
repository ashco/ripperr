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
  gap: 0.5rem;
  margin: 1rem 1rem 0;
  input {
    font-size: 24px;
    padding: 0.5rem;
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
    }
  }
`;

// const StyledFilterBar = styled.input`
//   margin: 1rem 1rem 0;
//   font-size: 24px;
//   padding: 0.5rem;
// `;
