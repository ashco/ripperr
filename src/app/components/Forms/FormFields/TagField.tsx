import React from 'react';
import styled from 'styled-components';

import { Row, FormError } from '../styles';

import { IHandleChange, IWorkoutFormValues } from '../../../common/types';

const TagField: React.FC<{
  form: IWorkoutFormValues;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, handleChange }) => {
  return (
    <TagFieldWrapper>
      <select multiple name="tags" value={form.tags} onChange={handleChange}>
        <option label="PUSH" value="Push" />
        <option label="PULL" value="Pull" />
        <option label="SQUAT" value="Squat" />
        <option label="CORE" value="Core" />
      </select>
    </TagFieldWrapper>
  );
};

const TagFieldWrapper = styled.div`
  select {
    padding: 0;
    padding-left: 1px;
    border: none;
    /* background-color: #eee; */
    overflow-x: auto;
    overflow-y: hidden;
    /* width: 100vw; */
    height: 46px;
    width: fit-content;
    align-self: center;
    outline: none;
  }
  option {
    height: auto;
    width: auto;
    border: 1px solid #000;
    background-color: white;
    margin-left: -1px;
    display: inline-block;
    padding: 0.5rem;
    font-size: 14px;
    margin-right: 0.25rem;
    cursor: pointer;
  }
`;

export { TagField };
