import React, { useState, useContext, useReducer } from 'react';
import styled from 'styled-components';
// import { toast } from 'react-toastify';

import {
  AuthUserContext,
  FirebaseContext,
  MovementsContext,
} from '../../context';
import { useFormState, useFormDispatch } from '../../context/FormContext';

// import { MovementFormWrapper } from '../Forms/styles';
import { ModalWrapper } from './styles';

// import { IMovements } from '../../common/types';
// import { FormMode, MovementType } from '../../common/enums';

const MovementModal: React.FC = () => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const { archetypes, exercises, workouts } = useContext(MovementsContext);

  const formState = useFormState();

  return (
    <MovementModalWrapper>
      <h1 className="title">Title</h1>
      {/* <h1 className="title">{text.title}</h1> */}
      <form
        // onSubmit={handleSubmit}
        // className={formMode === FormMode.View ? 'view-mode' : 'edit-mode'}
        noValidate
      >
        <div className="first-fields">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formState.name}
            // onChange={(e) =>
            //   formDispatch({ type: FormActionType.Name, value: e.target.value })
            // }
            // disabled={formMode === FormMode.View}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description..."
            value={formState.description}
            // onChange={(e) =>
            //   formDispatch({
            //     type: FormActionType.Description,
            //     value: e.target.value,
            //   })
            // }
            // disabled={formMode === FormMode.View}
          />
        </div>
      </form>
    </MovementModalWrapper>
  );
};

const MovementModalWrapper = styled(ModalWrapper)`
  display: grid;
  /* width: ${(p) => p.theme.space[12]}; */
  max-width: 100%;
  /* max-width: 70%; */
  h1.title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  input {
    font-size: 20px;
  }
  input[type='number'] {
    width: 4.5rem;
    text-align: center;
  }
  input,
  textarea {
    border: 2px solid black;
  }
  textarea {
    font-size: 1rem;
  }
  input,
  textarea,
  select {
    padding: 0.5rem;
  }
  select {
    border: none;
  }
  .view-mode {
    input,
    textarea {
      /* border: none;
      padding-left: 0; */
      background: none;
      color: ${(props) => props.theme.color.neutral[900]};
    }
  }
  .edit-mode {
  }
  /* .error {
    margin: auto 0.25rem;
    font-size: 0.75rem;
  } */
  .add-btn {
    width: 100%;
  }
  .add-btn,
  .rem-btn {
    font-size: 1.5rem;
    border: 1px solid black;
  }
  .missing-option {
    background: yellow;
  }
  width: ${(p) => p.theme.space[13]};

  /* ------ Section specific styling ------ */
  .first-fields {
    display: grid;
    /* grid-template-rows: auto 1rem auto 1rem auto 1rem; */
    grid-template-rows: auto auto;
    #description {
      height: 4rem;
      resize: none;
    }
  }
`;

export default MovementModal;
