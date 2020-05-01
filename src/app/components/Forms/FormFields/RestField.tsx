import React from 'react';
import styled from 'styled-components';

import { useMoveDispatch } from '../../../context/MoveContext';

import { Row } from '../styles';

import { IWorkoutRest } from '../../../types/types';
import { ModalMode } from '../../../types/enums';

const RestField: React.FC<{
  rest: IWorkoutRest;
  disabled: boolean;
}> = ({ rest, disabled }) => {
  const moveDispatch = useMoveDispatch();

  return (
    <RestFieldWrapper disabled={disabled}>
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            name="auto"
            onChange={(e) =>
              moveDispatch({
                type: 'MOVE_CHANGE_REST_AUTO',
                value: e.currentTarget.checked,
              })
            }
            checked={rest.auto}
            disabled={disabled}
          />
          <span>Automatic</span>
        </label>
      </div>
      <div className="number-container">
        <label>
          <input
            type="number"
            name="inner"
            min="0"
            onChange={(e) =>
              moveDispatch({
                type: 'MOVE_CHANGE_REST_INNER',
                value: e.currentTarget.value,
              })
            }
            value={rest.inner}
            disabled={disabled}
          />
          Inner
        </label>
        <label>
          <input
            type="number"
            name="outer"
            min="0"
            onChange={(e) =>
              moveDispatch({
                type: 'MOVE_CHANGE_REST_OUTER',
                value: e.currentTarget.value,
              })
            }
            value={rest.outer}
            disabled={disabled}
          />
          Outer
        </label>
      </div>
    </RestFieldWrapper>
  );
};

const RestFieldWrapper = styled.div<{ disabled: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  .checkbox-container {
    label {
      border: 2px solid ${(props) => props.theme.mode.color[100]};
      /* height: 100%; */
      cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
      input {
        display: none;
      }
      input:checked + span {
        background-color: ${(props) => props.theme.mode.color[100]};
        color: ${(props) => props.theme.mode.background[300]};
      }
      span {
        width: 100%;
        height: 100%;
        font-size: 16px;
        padding: 0.5rem;
      }
    }
  }
  .number-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    label {
      width: 100%;
      font-size: 14px;
      padding-bottom: 0.25rem;
      input {
        border-bottom: 2px solid ${(props) => props.theme.mode.color[100]};
        padding: 0.3rem;
        margin-bottom: 0.25rem;
        /* appearance: none; */
      }
      /* Remove input arrows */
      input[type='number']::-webkit-outer-spin-button,
      input[type='number']::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
    }
  }
`;

export default RestField;
