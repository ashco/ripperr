import React from 'react';
import styled from 'styled-components';

import { Row } from '../styles';

import {
  IHandleChange,
  IExerciseFormValues,
  IWorkoutFormValues,
  IExerciseFormErrors,
  // IWorkoutFormErrors,
} from '../../../common/types';

const FirstFields: React.FC<{
  form: IExerciseFormValues | IWorkoutFormValues;
  errors: IExerciseFormErrors;
  handleChange: (e: IHandleChange) => void;
}> = ({ form, errors, handleChange }) => {
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
        onChange={handleChange}
      />
      <span className="error">{errors.name}</span>
      <textarea
        id="description"
        name="description"
        placeholder="Enter a description..."
        value={form.description}
        onChange={handleChange}
      />
      <span className="error">{errors.description}</span>
      {/* <label htmlFor="tags"> */}
      {/* Tags */}
      {/* <div id="data"> */}
      <select multiple name="tags" value={form.tags} onChange={handleChange}>
        <option label="PUSH" value="Push" />
        <option label="PULL" value="Pull" />
        <option label="SQUAT" value="Squat" />
        <option label="CORE" value="Core" />
        {/* <option label="CORE2" value="Core2" />
        <option label="CORE3" value="Core3" /> */}
      </select>
      {/* </div> */}
      {/* </label> */}
      {/* <TagListWrapper>
        {tags.map((tag) => (
          <li key={tag} onClick={handleChange} label="PUSH" value="">
            {tag}
          </li>
        ))}
      </TagListWrapper> */}
      <span className="error">{errors.tags}</span>
    </FirstFieldsWrapper>
  );
};

const FirstFieldsWrapper = styled.div`
  display: grid;
  /* flex-direction: column; */
  grid-template-rows: auto 1rem auto 1rem auto 1rem;
  /* input,
  textarea {
    margin-bottom: 0.25rem;
    font-size: 1rem;
  } */
  .input-wrapper {
    display: grid;
    grid-template-rows: 1fr 1rem;
  }
  #description {
    height: 4rem;
    resize: none;
  }
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
