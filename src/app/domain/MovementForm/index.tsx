import React from 'react';
import { useSelector, useDispatch } from 'store';
import { setModalMode } from 'store/ui';
import { useForm, Controller } from 'react-hook-form';

import TextareaAutosize from 'react-textarea-autosize';

import { AuthUserContext, FirebaseContext, MovementListContext } from 'context';
import { useMoveState, useMoveDispatch } from 'context/MoveContext';
// import { usedispatch, usemodal } from 'context/ModalContext';

import MovementFormWrapper from './style';

import ArchetypesField from './ArchetypesField';
import AddMovementButton from './AddMovementButton';
import Label from './Label';
import ModeField from './ModeField';
import MovementsField from './MovementsField';
import RestField from './RestField';
import ButtonRow from 'components/ButtonRow';

import useCurrentWidth from 'hooks/useCurrentWidth';
import singleCapString from 'utils/single-cap-string';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  ButtonRowProps,
} from 'types/types';
import { MovementType } from 'types/enums';

type FormData = {
  name: string;
  description: string;
  tags: string[];
};

const MovementForm: React.FC<{}> = () => {
  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);
  const movementList = React.useContext(MovementListContext);

  const moveState = useMoveState();
  const moveDispatch = useMoveDispatch();
  const dispatch = useDispatch();
  const { modalMode } = useSelector((state) => state.ui);
  // const dispatch = usedispatch();
  // const modal = usemodal();

  const defaultValues: any = {
    name: (moveState as Movement).name,
    description: (moveState as Movement).description,
    tags: [...(moveState as Exercise | Workout).tags],
  };

  const isDisabled = modalMode === 'VIEW';
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

          dispatch(setModalMode({ modalMode: 'VIEW' }));
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
          dispatch(setModalMode({ modalMode: 'VIEW' }));
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
    if (modalMode === 'VIEW') {
      dispatch(setModalMode({ modalMode: 'EDIT' }));
    } else if (modalMode === 'EDIT') {
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
    if (modalMode === 'VIEW' || isNewEntry) {
      dispatch(setModalMode({ modalMode: null }));
      moveDispatch({ type: 'MOVE_CLEAR' });
    } else if (modalMode === 'EDIT') {
      dispatch(setModalMode({ modalMode: 'VIEW' }));
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
  switch (modalMode) {
    case 'VIEW':
      btnConfig.cancelBtn.text = 'Close';
      btnConfig.actionBtn.text = 'Edit';
      break;
    case 'EDIT':
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
        display={modalMode === 'VIEW' ? 'none' : isMobile ? 'block' : 'inline'}
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
                    modalMode={modalMode}
                    isDisabled={isDisabled}
                  />
                )}
                {modalMode === 'EDIT' && <AddMovementButton />}
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
