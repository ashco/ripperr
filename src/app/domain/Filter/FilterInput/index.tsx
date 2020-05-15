import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';

import { useAddMoveMode } from 'context/AddMoveModeContext';
// import { useModalDispatch } from 'context/ModalContext';

import AddMovementButton from '../AddMovementButton';
import ClearFilterButton from '../ClearFilterButton';

const FilterInput: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  // const modalDispatch = useModalDispatch();

  const addMoveMode = useAddMoveMode()[0];

  const filtering = filter.value.length > 0 || filter.tags.length > 0;

  function openModal(): void {
    dispatch(setModalMode({ modalMode: 'ADD' }));
  }

  return (
    <FilterInputWrapper>
      <input
        className="filter-bar"
        type="text"
        placeholder="Filter..."
        value={filter.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: 'FILTER_UPDATE_VALUE',
            payload: e.target.value,
          })
        }
        onFocus={() => dispatch({ type: 'FILTER_ON' })}
      />
      {filtering ? (
        <ClearFilterButton />
      ) : (
        !addMoveMode && <AddMovementButton openModal={openModal} />
      )}
    </FilterInputWrapper>
  );
};

const FilterInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  gap: 1rem;
  max-width: 1024px;
  justify-self: center;
  width: 100%;
  input {
    font-size: 24px;
    padding: 0.5rem 1rem;
    box-shadow: ${(props) => props.theme.shadow[2]};
    border: none;
    background: ${(props) => props.theme.mode.background[300]};
    border-radius: 5px;
    color: ${(props) => props.theme.mode.color[100]};
    width: inherit;
  }
`;

export default FilterInput;
