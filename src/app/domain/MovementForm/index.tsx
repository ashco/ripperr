import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import TextareaAutosize from 'react-textarea-autosize';

import { AuthUserContext, FirebaseContext, MovementListContext } from 'context';
import { useMoveState, useMoveDispatch } from 'context/MoveContext';
import { useModalDispatch } from 'context/ModalContext';

import MovementFormWrapper from './style';

import ArchetypesField from './ArchetypesField';
import AddMovementButton from './AddMovementButton';
import Label from './Label';
import ModeField from './ModeField';
import MovementsField from './MovementsField';
import RestField from './RestField';
import ButtonRow from 'components/ButtonRow';

import useCurrentWidth from 'hooks/useCurrentWidth';
import singleCapString from '@/utils/single-cap-string';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from 'types/types';
import { ModalMode, MovementType } from 'types/enums';

type FormData = {
  name: string;
  description: string;
  tags: string[];
};

const MovementForm: React.FC<{
  mode: ModalMode.Edit | ModalMode.View;
}> = ({ mode }) => {
  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);
  const movementList = React.useContext(MovementListContext);

  const moveState = useMoveState();
  const moveDispatch = useMoveDispatch();
  const modalDispatch = useModalDispatch();

  const defaultValues: any = {
    name: (moveState as Movement).name,
    description: (moveState as Movement).description,
    tags: [...(moveState as Exercise | Workout).tags],
  };

  const isDisabled = mode === ModalMode.View;
  const isNewEntry = !moveState?.id;
  // TODO - update useCurrentWidth to listen on window resize, no setTimeout usage
  // const isMobile = useCurrentWidth() < 600;
  const isMobile = false;

  const {
    control,
    register,
    unregister,
    reset,
    watch,
    errors,
    handleSubmit,
    setValue,
  } = useForm<FormData>({
    defaultValues,
  });

  let moveList: Archetype[] | Exercise[] | Workout[];
  switch (moveState?.type) {
    case MovementType.Archetype:
      moveList = movementList.archetypes;
      break;
    case MovementType.Exercise:
      moveList = movementList.exercises;
      break;
    case MovementType.Workout:
      moveList = movementList.workouts;
      break;
    default:
      throw Error('No MovementType specified!');
  }

  // ========= MOVEMENT FUNCTIONS =========
  function updateMovement(moveData: Movement): void {
    let firebaseFnc;

    switch (moveData.type) {
      case MovementType.Archetype:
        firebaseFnc = firebase.archetype;
        break;
      case MovementType.Exercise:
        firebaseFnc = firebase.exercise;
        break;
      case MovementType.Workout:
        firebaseFnc = firebase.workout;
        break;
      default:
        throw Error('moveData type is not recognized');
    }

    if (authUser && moveData.id) {
      // const moveObj: Movement = { ...moveData };
      moveData.lastModified = firebase.getTimestamp();

      firebaseFnc(authUser.uid, moveData.id)
        .update(moveData)
        .then(() => {
          console.log(
            `${singleCapString(moveData.type)} Updated: ${moveData.name}`,
          );
          console.log(moveData);
          console.log(watch());

          modalDispatch({ type: 'MODAL_VIEW' });
          moveDispatch({ type: 'MOVE_SET', value: moveData });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser && moveData.id!');
    }
  }

  function createMovement(moveData: Movement): void {
    let firebaseFnc;

    switch (moveData.type) {
      case MovementType.Archetype:
        firebaseFnc = firebase.archetypes;
        break;
      case MovementType.Exercise:
        firebaseFnc = firebase.exercises;
        break;
      case MovementType.Workout:
        firebaseFnc = firebase.workouts;
        break;
      default:
        throw Error('moveData.type is not recognized');
    }

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();
      // TODO Check that name is unique

      moveData.lastModified = firebase.getTimestamp();

      docRef
        .set(moveData)
        .then(() => {
          console.log(
            `${singleCapString(moveData.type)} Added: ${moveData.name}`,
          );
          modalDispatch({ type: 'MODAL_VIEW' });
          moveDispatch({ type: 'MOVE_SET', value: moveData });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser!');
    }
  }

  function onSubmit(formData: FormData) {
    if (mode === ModalMode.View) {
      modalDispatch({ type: 'MODAL_EDIT' });
    } else if (mode === ModalMode.Edit) {
      const moveData = {
        ...(moveState as Movement),
        ...formData,
      };

      isNewEntry ? createMovement(moveData) : updateMovement(moveData);
    } else {
      throw Error('Unsupported ModalMode provided.');
    }
  }

  function resetForm(): void {
    // Need to reset values manually in order to ensure all fields reset. Some are fine, but Controlled components (TextareaAutosize, React-Select) are weird and need to be done manually
    const resetValues = Object.keys(defaultValues).map((key) => {
      return { [key]: defaultValues[key] };
    });

    setValue(resetValues);
  }

  function handleClose(): void {
    if (mode === ModalMode.View || isNewEntry) {
      modalDispatch({ type: 'MODAL_CLOSE' });
      moveDispatch({ type: 'MOVE_CLEAR' });
    } else if (mode === ModalMode.Edit) {
      modalDispatch({ type: 'MODAL_VIEW' });
      resetForm();
    } else {
      throw Error('Unsupported ModalMode provided.');
    }
  }

  // BUTTON CONFIGURATION LOGIC
  const btnConfig: ButtonRowProps = {
    cancelBtn: {
      onClick: handleClose,
      text: '',
    },
    actionBtn: {
      text: '',
    },
  };
  switch (mode) {
    case ModalMode.View:
      btnConfig.cancelBtn.text = 'Close';
      btnConfig.actionBtn.text = 'Edit';
      break;
    case ModalMode.Edit:
      btnConfig.cancelBtn.text = 'Cancel';
      btnConfig.actionBtn.text = isNewEntry ? 'Create' : 'Update';
      break;
    default:
      break;
  }

  React.useEffect(() => {
    register({ name: 'tags' });

    return () => unregister('tags');
  }, [register]);

  console.log(watch());

  return (
    <MovementFormWrapper onSubmit={handleSubmit(onSubmit)} noValidate>
      <Label
        text="Name:"
        display={
          mode === ModalMode.View ? 'none' : isMobile ? 'block' : 'inline'
        }
      >
        <input
          name="name"
          placeholder="Name"
          ref={register({
            required: true,
          })}
          disabled={isDisabled}
          autoFocus
        />
      </Label>
      <Label
        text="Description:"
        display={
          isDisabled && !moveState.description.length
            ? 'none'
            : isMobile
            ? 'block'
            : isDisabled
            ? 'block'
            : 'inline'
        }
      >
        <Controller
          as={<TextareaAutosize maxRows={4} />}
          name="description"
          control={control}
          placeholder="Enter a description..."
          disabled={isDisabled}
        />
      </Label>
      {/* {moveState?.type === MovementType.Workout && (
        <>
          <Label text="Mode:" display={isMobile ? 'block' : 'inline'}>
            <ModeField
              value={(moveState as Workout).mode}
              isDisabled={isDisabled}
            />
          </Label>

          {(moveState as Workout).mode && (
            <>
              <Label text="Rest:" display={isMobile ? 'block' : 'inline'}>
                <RestField
                  rest={(moveState as Workout).rest}
                  isDisabled={isDisabled}
                />
              </Label>

              <Label text="Movements:" display="block">
                {(moveState as Workout).movements.length > 0 && (
                  <MovementsField
                    movements={(moveState as Workout).movements}
                    mode={(moveState as Workout).mode}
                    modalMode={mode}
                    isDisabled={isDisabled}
                  />
                )}
                {mode === ModalMode.Edit && <AddMovementButton />}
              </Label>
            </>
          )}
        </>
      )} */}
      {(moveState?.type === MovementType.Exercise ||
        moveState?.type === MovementType.Workout) && (
        <Label
          text="Tags:"
          display={
            isDisabled && !(moveState as Exercise | Workout).tags.length
              ? 'none'
              : 'block'
          }
        >
          <ArchetypesField
            tags={watch().tags}
            setValue={setValue}
            modalMode={mode}
            isDisabled={isDisabled}
            control={control}
            watch={watch}
          />
        </Label>
      )}
      <ButtonRow config={btnConfig} />
    </MovementFormWrapper>
  );
};

export default MovementForm;
