import React, { useState, useContext, useReducer } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import {
  AuthUserContext,
  FirebaseContext,
  MovementListContext,
} from '../../context';
import { useMoveState, useMoveDispatch } from '../../context/MoveContext';
import { useModalDispatch } from '../../context/ModalContext';

// import { MovementFormWrapper } from '../Forms/styles';
import { ModalWrapper } from './styles';
import {
  InlineField,
  ButtonRow,
  ArchField,
  MovementsField,
  AddMovementButton,
  RestField,
} from '../Forms';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from '../../types/types';
import { ModalMode, MovementType } from '../../types/enums';

const MovementModal: React.FC<{
  mode: ModalMode.Add | ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const movementList = useContext(MovementListContext);

  const moveDispatch = useMoveDispatch();
  const modalDispatch = useModalDispatch();
  const moveState = useMoveState();

  let moveList: Archetype[] | Exercise[] | Workout[];
  if (moveState?.type === MovementType.Archetype) {
    moveList = movementList.archetypes;
  } else if (moveState?.type === MovementType.Exercise) {
    moveList = movementList.exercises;
  } else if (moveState?.type === MovementType.Workout) {
    moveList = movementList.workouts;
  } else {
    throw Error('No MovementType specified!');
  }

  // ============ MODE SPECIFIC VALUES ============

  let movementText = 'Archetype';
  if (moveState?.type === MovementType.Exercise) {
    movementText = 'Exercise';
  } else if (moveState?.type === MovementType.Workout) {
    movementText = 'Workout';
  }

  let actionText = 'Add';
  let submitButton = 'Submit';

  if (mode === ModalMode.Edit) {
    actionText = 'Edit';
    submitButton = 'Update';
  } else if (mode === ModalMode.View) {
    actionText = 'View';
    submitButton = 'Edit';
  }

  const text = {
    title: `${actionText} ${movementText}`,
    submitButton,
  };

  // ========= MOVEMENT FUNCTIONS =========

  function handleUpdateMovement(moveState: Movement): void {
    let firebaseFnc;

    if (moveState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetype;
    } else if (moveState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercise;
    } else if (moveState.type === MovementType.Workout) {
      firebaseFnc = firebase.workout;
    } else {
      throw Error('moveState type is not recognized!');
    }

    if (authUser && moveState.id) {
      // Check that name is unique or matches with current id

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();

      firebaseFnc(authUser.uid, moveState.id)
        .update(moveObj)
        .then(() => {
          console.log(`${movementText} Updated: ${moveObj.name}`);
          modalDispatch({ type: 'MODAL_CLOSE' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser && movement && movement.id!');
    }
  }

  function handleCreateMovement(moveState: Movement): void {
    let firebaseFnc;
    // let moveList;
    if (moveState.type === MovementType.Archetype) {
      firebaseFnc = firebase.archetypes;
      // moveList = movementList.archetypes;
    } else if (moveState.type === MovementType.Exercise) {
      firebaseFnc = firebase.exercises;
      // moveList = movementList.exercises;
    } else if (moveState.type === MovementType.Workout) {
      firebaseFnc = firebase.workouts;
      // moveList = movementList.workouts;
    } else {
      throw Error('No MovementType specified!');
    }

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // Check that name is unique
      // const moveNames = moveList.map((move) => move.name);

      const moveObj: Movement = { ...moveState };
      moveObj.lastModified = firebase.getTimestamp();
      // const move
      docRef
        .set(moveObj)
        .then(() => {
          console.log(`${movementText} Added: ${moveObj.name}`);
          modalDispatch({ type: 'MODAL_CLOSE' });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser!');
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!moveState) {
      throw Error('No moveState detected!');
    }

    if (mode === ModalMode.Add) {
      handleCreateMovement(moveState);
    } else if (mode === ModalMode.Edit) {
      if (moveState.id) {
        handleUpdateMovement(moveState);
      } else {
        throw Error('No moveState.id detected!');
      }
    } else if (mode === ModalMode.View) {
      modalDispatch({ type: 'MODAL_EDIT' });
    } else {
      throw Error('Unsupported ModalMode provided.');
    }
  }

  function handleClose() {
    modalDispatch({ type: 'MODAL_CLOSE' });
    moveDispatch({ type: 'MOVE_CLEAR' });
  }

  // BUTTON ROW CONFIG
  const btnConfig: ButtonRowProps = {
    cancelBtn: {
      text: 'Cancel',
      onClick: handleClose,
    },
    actionBtn: {
      text: 'Create',
    },
  };

  if (mode === ModalMode.Edit) {
    btnConfig.cancelBtn.onClick = (): void => {
      modalDispatch({ type: 'MODAL_VIEW' });

      // Have moveState reset back to original non-edited state
      const initMoveState = moveList.find((move) => move.id === moveState?.id);
      console.log(initMoveState);

      moveDispatch({ type: 'MOVE_SET', value: initMoveState });
    };
    btnConfig.cancelBtn.text = 'Cancel';
    btnConfig.actionBtn.text = 'Update';
  } else if (mode === ModalMode.View) {
    btnConfig.cancelBtn.text = 'Close';
    btnConfig.actionBtn.text = 'Edit';
  }

  const disabled = mode === ModalMode.View;

  console.log(moveState);

  const showDesc =
    mode !== ModalMode.View ||
    (mode === ModalMode.View && (moveState as Movement).description !== '');

  return (
    <MovementModalWrapper type={(moveState as Movement).type}>
      <h1 className="title">{text.title}</h1>
      <form
        onSubmit={handleSubmit}
        className={mode === ModalMode.View ? 'view-mode' : 'edit-mode'}
        noValidate
      >
        <div className="top-fields">
          <InlineField name="Name:">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={(moveState as Movement).name}
              onChange={(e) =>
                moveDispatch({
                  type: 'MOVE_CHANGE_NAME',
                  value: e.target.value,
                })
              }
              disabled={disabled}
            />
          </InlineField>
          <InlineField name="Description:">
            <input
              id="description"
              name="description"
              placeholder="Enter a description..."
              value={(moveState as Movement).description}
              onChange={(e) =>
                moveDispatch({
                  type: 'MOVE_CHANGE_DESCRIPTION',
                  value: e.target.value,
                })
              }
              disabled={disabled}
            />
          </InlineField>
          <InlineField name="Mode:">
            <WorkoutModeField>
              <label>
                <input
                  type="radio"
                  name="mode"
                  id="mode-reps"
                  checked={(moveState as Workout).mode === 'REPS'}
                  value="REPS"
                  onChange={(e) =>
                    moveDispatch({
                      type: 'MOVE_CHANGE_MODE',
                      value: e.currentTarget.value,
                    })
                  }
                  disabled={disabled}
                />
                <span>Reps</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  id="mode-timed"
                  checked={(moveState as Workout).mode === 'TIMED'}
                  value="TIMED"
                  onChange={(e) =>
                    moveDispatch({
                      type: 'MOVE_CHANGE_MODE',
                      value: e.currentTarget.value,
                    })
                  }
                  disabled={disabled}
                />
                <span>Timed</span>
              </label>
              {/* <input
                type="radio"
                name="mode"
                id="mode-reps"
                checked={(moveState as Workout).mode === 'REPS'}
                value="REPS"
                onChange={(e) =>
                  moveDispatch({
                    type: 'MOVE_CHANGE_MODE',
                    value: e.currentTarget.value,
                  })
                }
                disabled={disabled}
              />
              <input
                type="radio"
                name="mode"
                id="mode-timed"
                checked={(moveState as Workout).mode === 'TIMED'}
                value="TIMED"
                onChange={(e) =>
                  moveDispatch({
                    type: 'MOVE_CHANGE_MODE',
                    value: e.currentTarget.value,
                  })
                }
                disabled={disabled}
              />
              <label htmlFor="mode-reps">Reps</label>
              <label htmlFor="mode-timed">Timed</label> */}
            </WorkoutModeField>
          </InlineField>
        </div>
        {/*
        <div className="form-fields">
          {moveState?.type === MovementType.Workout && (
            <>

              <MovementsField
                movements={(moveState as Workout).movements}
                mode={(moveState as Workout).mode}
                modalMode={mode}
                disabled={disabled}
              />
              {(mode === ModalMode.Add || mode === ModalMode.Edit) && (
                <AddMovementButton />
              )}
              <RestField
                rest={(moveState as Workout).rest}
                disabled={disabled}
                // modalMode={mode}
              />
            </>
          )}
          {(moveState?.type === MovementType.Exercise ||
            moveState?.type === MovementType.Workout) && (
            <ArchField
              tags={(moveState as Exercise | Workout).tags}
              modalMode={mode}
              disabled={disabled}
            />
          )}
        </div> */}
        <ButtonRow config={btnConfig} />
      </form>
    </MovementModalWrapper>
    // <MovementModalWrapper type={(moveState as Movement).type}>
    //   <h1 className="title">{text.title}</h1>
    //   <form
    //     onSubmit={handleSubmit}
    //     className={mode === ModalMode.View ? 'view-mode' : 'edit-mode'}
    //     noValidate
    //   >
    //     <div className="form-fields">
    //       <input
    //         type="text"
    //         name="name"
    //         placeholder="Name"
    //         value={(moveState as Movement).name}
    //         onChange={(e) =>
    //           moveDispatch({
    //             type: 'MOVE_CHANGE_NAME',
    //             value: e.target.value,
    //           })
    //         }
    //         disabled={disabled}
    //       />
    //       {showDesc && (
    //         <textarea
    //           id="description"
    //           name="description"
    //           placeholder="Enter a description..."
    //           value={(moveState as Movement).description}
    //           onChange={(e) =>
    //             moveDispatch({
    //               type: 'MOVE_CHANGE_DESCRIPTION',
    //               value: e.target.value,
    //             })
    //           }
    //           disabled={disabled}
    //         />
    //       )}
    //       {moveState?.type === MovementType.Workout && (
    //         <>
    //           <WorkoutModeField>
    //             <label htmlFor="reps">
    //               <input
    //                 type="radio"
    //                 id="reps"
    //                 name="mode"
    //                 checked={(moveState as Workout).mode === 'REPS'}
    //                 value="REPS"
    //                 onChange={(e) =>
    //                   moveDispatch({
    //                     type: 'MOVE_CHANGE_MODE',
    //                     value: e.currentTarget.value,
    //                   })
    //                 }
    //                 disabled={disabled}
    //               />
    //               Reps
    //             </label>
    //             <label htmlFor="timed">
    //               <input
    //                 type="radio"
    //                 id="timed"
    //                 name="mode"
    //                 checked={(moveState as Workout).mode === 'TIMED'}
    //                 value="TIMED"
    //                 onChange={(e) =>
    //                   moveDispatch({
    //                     type: 'MOVE_CHANGE_MODE',
    //                     value: e.currentTarget.value,
    //                   })
    //                 }
    //                 disabled={disabled}
    //               />
    //               Timed
    //             </label>
    //           </WorkoutModeField>
    //           <MovementsField
    //             movements={(moveState as Workout).movements}
    //             mode={(moveState as Workout).mode}
    //             modalMode={mode}
    //             disabled={disabled}
    //           />
    //           {(mode === ModalMode.Add || mode === ModalMode.Edit) && (
    //             <AddMovementButton />
    //           )}
    //           <RestField
    //             rest={(moveState as Workout).rest}
    //             disabled={disabled}
    //             // modalMode={mode}
    //           />
    //         </>
    //       )}
    //       {(moveState?.type === MovementType.Exercise ||
    //         moveState?.type === MovementType.Workout) && (
    //         <ArchField
    //           tags={(moveState as Exercise | Workout).tags}
    //           modalMode={mode}
    //           disabled={disabled}
    //         />
    //       )}
    //     </div>
    //     <ButtonRow config={btnConfig} />
    //   </form>
    // </MovementModalWrapper>
  );
};

const MovementModalWrapper = styled(ModalWrapper)<{ type: MovementType }>`
  display: grid;
  max-width: 100%;
  width: ${(props) =>
    props.type === MovementType.Workout ? '40rem' : '32rem'};
  border-top: 7px solid
    ${(props) =>
      props.type === MovementType.Archetype
        ? props.theme.color.orange[500]
        : props.type === MovementType.Exercise
        ? props.theme.color.purple[500]
        : props.type === MovementType.Workout
        ? props.theme.color.blue[500]
        : 'none'};
  form {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 0.5rem;
  }
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
  input[type='number'] {
    width: 5.5rem;
    text-align: center;
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
      background: none;
    }
  }
  .edit-mode {
  }
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

  /* ------ Section specific styling ------ */
  /* .form-fields {
    display: grid;
    grid-template-rows: auto auto;
    gap: 0.5rem; */
  /* #description {
      height: 4rem;
      resize: none;
    } */
  .top-fields {
    display: grid;
    gap: 0.5rem;
  }
`;

const WorkoutModeField = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  gap: 0.5rem;
  label {
    border: 2px solid ${(props) => props.theme.mode.color[100]};
    cursor: pointer;
  }
  label input {
    display: none;
  }
  label span {
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
  }
  input:checked + span {
    background-color: ${(props) => props.theme.mode.color[100]};
    color: ${(props) => props.theme.mode.background[300]};
  }
`;

export default MovementModal;
