import React from 'react';
import styled, { ThemeContext, DefaultTheme } from 'styled-components';

import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import {
  setFilterValue,
  showFilter,
  resetFilter,
  FilterState,
} from 'store/filter';

import Button from 'components/Button';

import Icon from 'components/Icon';

interface BtnProps {
  onClick: () => void;
  theme: DefaultTheme;
}
interface Config {
  iconName: string | null;
  labelText: string | null;
  onClick: (() => void) | null;
}

const AddMoveButton: React.FC<BtnProps> = ({ onClick, theme }) => (
  <Button onClick={onClick} aria-label="Add Move">
    <Icon name="plus" fill={theme.mode.color[200]} />
  </Button>
);

const ClearFilterButton: React.FC<BtnProps> = ({ onClick, theme }) => (
  <Button onClick={onClick} aria-label="Clear filter">
    <Icon name="times" viewBox="0 0 352 512" fill={theme.mode.color[200]} />
  </Button>
);

const FilterInput: React.FC<{ filter: FilterState }> = ({ filter }) => {
  const dispatch = useDispatch();
  const theme = React.useContext(ThemeContext);

  const { isAddMoveMode } = useSelector((state) => state.ui);

  function openModal(): void {
    dispatch(setModalMode({ modalMode: 'ADD' }));
  }

  function clearFilter(): void {
    dispatch(resetFilter());
  }

  return (
    <FilterInputWrapper>
      <input
        aria-label="filter input"
        type="text"
        placeholder="Filter..."
        value={filter.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(setFilterValue(e.target.value))
        }
        onFocus={() => dispatch(showFilter({ open: true }))}
      />
      {!isAddMoveMode && filter.active ? (
        <ClearFilterButton onClick={clearFilter} theme={theme} />
      ) : (
        <AddMoveButton onClick={openModal} theme={theme} />
      )}
    </FilterInputWrapper>
  );
};

const FilterInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3.5rem;
  gap: 1rem;
  max-width: 1024px;
  justify-self: center;
  width: 100%;
  input {
    font-size: 24px;
    padding: 0.5rem 1rem;
    color: ${(p) => p.theme.mode.color[100]};
    width: inherit;
  }
  button {
    width: 3.5rem;
    height: 3.5rem;
  }
  button,
  input {
    border-radius: 5px;
    background: ${(p) => p.theme.mode.background[300]};
    border: none;
    box-shadow: ${(p) => p.theme.shadow[2]};
  }
`;

export default FilterInput;
