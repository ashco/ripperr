import React from 'react';
import { FieldError } from 'react-hook-form';

import { ButtonLabel } from '../ModeField';

import RestFieldWrapper from './style';

const RestField: React.FC<{
  register: any;
  error?: FieldError;
  isDisabled: boolean;
}> = ({ register, error, isDisabled }) => {
  return (
    <RestFieldWrapper disabled={isDisabled}>
      <label htmlFor="rest" role={error?.message && 'alert'}>
        {error?.message || 'Rest:'}
      </label>
      {/* <div className="row"> */}
      <ButtonLabel disabled={isDisabled}>
        <input
          type="checkbox"
          name="rest.auto"
          ref={register}
          disabled={isDisabled}
        />
        <span>Automatic</span>
      </ButtonLabel>
      {/* </div> */}
      {/* <div className="row"> */}
      <div className="row number-container">
        <label>
          <input
            type="number"
            name="rest.inner"
            min="0"
            ref={register}
            disabled={isDisabled}
          />
          Inner
        </label>
        <label>
          <input
            type="number"
            name="rest.outer"
            min="0"
            ref={register}
            disabled={isDisabled}
          />
          Outer
        </label>
      </div>
      {/* </div> */}
    </RestFieldWrapper>
  );
};

export default RestField;
