import React, { useContext } from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../../context';

import { Row, FormError } from '../styles';

import {
  IHandleChange,
  IFormReducerAction,
  Archetype,
  Exercise,
  Workout,
} from '../../../types/types';
import { FormActionType } from '../../../types/enums';

const TagField: React.FC<{
  form: Exercise | Workout;
  // form: WorkoutFormState;
  // handleChange: (e: IHandleChange) => void;
  moveDispatch: React.Dispatch<IFormReducerAction>;
  archetypes: Archetype[];
}> = ({ form, moveDispatch, archetypes }) => {
  console.log(archetypes.map((arch) => arch.name));

  return (
    <ArchFieldWrapper>
      {/* {archetypes.map((arch) => (
        <ArchIcon key={arch.id} />
      ))} */}
      {/* <select
        multiple
        name="tags"
        value={form.tags}
        onChange={(e: any) =>
          moveDispatch({ type: FormActionType.Tag, value: e.target.value })
        }
      >
        <option label="PUSH" value="Push" />
        <option label="PULL" value="Pull" />
        <option label="SQUAT" value="Squat" />
        <option label="CORE" value="Core" />
      </select> */}
    </ArchFieldWrapper>
  );
};

const ArchFieldWrapper = styled.ol`
  display: grid;
  gap: 0.5rem;
  /* grid-template-columns: auto; */
  /* grid-template-rows: 2rem; */
  grid-template-columns: repeat(auto-fit, 2rem);
  /* padding: 0; */
  /* padding-left: 1px; */
  /* border: none; */
  /* overflow-x: auto; */
  /* overflow-y: hidden; */
  /* height: 46px; */
  /* width: fit-content;
    align-self: center;
    outline: none; */

  li {
    /* height: auto;
    width: auto; */
    /* border: 1px solid #000; */
    /* background-color: white; */
    /* margin-left: -1px; */
    /* display: inline-block; */
    /* padding: 0.5rem; */
    /* font-size: 14px; */
    /* margin-right: 0.25rem; */
    cursor: pointer;
  }
`;

const ArchIcon = styled.li`
  height: 1rem;
  width: 1rem;
  background: ${(props) => props.color};
  box-shadow: ${(props) => props.theme.shadow[0]};
`;

export { TagField };
