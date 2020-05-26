import React from 'react';
import { FieldError } from 'react-hook-form';

import RestFieldWrapper from './style';

// import { IWorkoutRest } from 'types/types';

const RestField: React.FC<{
  // rest: IWorkoutRest;
  register: any;
  error?: FieldError;
  isDisabled: boolean;
}> = ({ register, error, isDisabled }) => {
  // const moveDispatch = useMoveDispatch();

  return (
    <RestFieldWrapper disabled={isDisabled}>
      <label htmlFor="rest" role={error?.message && 'alert'}>
        {error?.message || 'Rest:'}
      </label>
      <div className="row">
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              name="rest.auto"
              ref={register}
              // onChange={
              //   (e) => console.log('heie')
              //   // moveDispatch({
              //   //   type: 'MOVE_CHANGE_REST_AUTO',
              //   //   value: e.currentTarget.checked,
              //   // })
              // }
              // checked={rest.auto}
              disabled={isDisabled}
            />
            <span>Automatic</span>
          </label>
        </div>
        <div className="number-container">
          <label>
            <input
              type="number"
              name="rest.inner"
              min="0"
              ref={register}
              // onChange={
              //   (e) => console.log('yaya')
              //   // moveDispatch({
              //   //   type: 'MOVE_CHANGE_REST_INNER',
              //   //   value: e.currentTarget.value,
              //   // })
              // }
              // value={rest.inner}
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
              // onChange={
              //   (e) => console.log('chacha')
              //   // moveDispatch({
              //   //   type: 'MOVE_CHANGE_REST_OUTER',
              //   //   value: e.currentTarget.value,
              //   // })
              // }
              // value={rest.outer}
              disabled={isDisabled}
            />
            Outer
          </label>
        </div>
      </div>
    </RestFieldWrapper>
  );
};

export default RestField;
