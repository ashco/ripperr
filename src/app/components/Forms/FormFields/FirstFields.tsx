import React from 'react';
import styled from 'styled-components';

import { Row, FormError } from '../styles';

import {
  IHandleChange,
  IArchetypeFormErrors,
  IExerciseFormErrors,
  // IWorkoutFormErrors,
  IFormReducerAction,
  Movement,
} from '../../../common/types';
// import { FormMode } from '../../../common/enums';

const FirstFields: React.FC<{
  form: Movement;
  errors: IArchetypeFormErrors | IExerciseFormErrors;
  // formMode: FormMode;
  // handleChange: (e: IHandleChange) => void;
  movementDispatch: React.Dispatch<IFormReducerAction>;
}> = ({ form, errors, movementDispatch }) => {
  // const tags = [
  //   'Push',
  //   'Pull',
  //   'Squat',
  //   'Core',
  //   'Push2',
  //   'Pull2',
  //   'Squat2',
  //   'Core2',
  // ];

  // const selectedTags = [...form.tags];

  // function handleTag(tag: string) {
  //   const tagIndex = selectedTags.indexOf(tag);

  //   selectedTags.includes(tag)
  //     ? selectedTags.splice(tagIndex, 1)
  //     : selectedTags.push(tag);

  //   console.log(selectedTags);
  // }

  // console.log(selectedTags);

  return (
    <FirstFieldsWrapper>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        // onChange={(e) =>
        //   movementDispatch({ type: FormActionType.Name, value: e.target.value })
        // }
        // disabled={formMode === FormMode.View}
      />
      <FormError>{errors.name}</FormError>
      <textarea
        id="description"
        name="description"
        placeholder="Enter a description..."
        value={form.description}
        // onChange={(e) =>
        //   movementDispatch({
        //     type: FormActionType.Description,
        //     value: e.target.value,
        //   })
        // }
        // disabled={formMode === FormMode.View}
      />
      <FormError>{errors.description}</FormError>
      {/* <label htmlFor="tags"> */}
      {/* Tags */}
      {/* <div id="data"> */}
    </FirstFieldsWrapper>
  );
};

const FirstFieldsWrapper = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-template-rows: auto 1rem auto 1rem auto 1rem;
  #description {
    height: 4rem;
    resize: none;
  }

  /* select {
    padding: 0;
    padding-left: 1px;
    border: none;
    overflow-x: auto;
    overflow-y: hidden;
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
  } */
`;

const TagListWrapper = styled.ul`
  display: flex;
  overflow: auto;
  li {
    font-size: 14px;
    height: auto;
    width: auto;
    border: 1px solid black;
    padding: 0.5rem;
    margin-right: 0.25rem;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: grey;
    }
  }
  li.active {
    background: purple;
  }
`;

export default FirstFields;
