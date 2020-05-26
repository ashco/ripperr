import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { setActiveMove, clearActiveMove, initialState } from 'store/moves';
import { useForm, Controller, FieldElement } from 'react-hook-form';
import * as yup from 'yup';
import Textarea from 'components/Textarea';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';

import MoveFormWrapper from './style';

import TagsField from './TagsField';
// import Label from './Label';
import ModeField from './ModeField';
// import MovementsField from './MovementsField';
import RestField from './RestField';
import ButtonRow from 'components/ButtonRow';
import FieldWrapper from 'components/FieldWrapper';

import useCurrentWidth from 'hooks/useCurrentWidth';
import singleCapString from 'utils/single-cap-string';
// import { MoveDataType } from 'utils/lookup-move@';

import {
  MovementId,
  ButtonRowProps,
  MovementType,
  ModalMode,
  Tag,
  Exercise,
  Workout,
  Movement,
} from 'types';
import Input from 'components/Input';

import {
  tagSchema,
  exerciseSchema,
  workoutSchema,
} from 'utils/validation-schema';
import assertNever from 'utils/assert-never';

function isExercise(data: Movement): data is Exercise {
  return (data as Exercise).tags !== undefined;
}
function isWorkout(data: Movement): data is Workout {
  return (data as Workout).mode !== undefined;
}

// function generateDefaultValues(type: 'TAG'): Tag;
// function generateDefaultValues(type: 'EXERCISE'): Exercise;
// function generateDefaultValues(type: 'WORKOUT'): Workout;
function generateDefaultValues(type: MovementType): Movement {
  switch (type) {
    case 'TAG':
      return {
        name: '',
        description: '',
      };
    case 'EXERCISE':
      return {
        name: '',
        description: '',
        tags: [],
      };
    case 'WORKOUT':
      return {
        name: '',
        description: '',
        tags: [],
        mode: [null, null],
        rounds: null,
        rest: {
          auto: false,
          inner: null,
          outer: null,
        },
        movements: [],
      };
    default:
      assertNever(type);
  }
}

const MoveForm: React.FC<{
  modalMode: ModalMode;
  move: {
    data: MovementId | null;
    type: MovementType;
  };
}> = ({ modalMode, move: { data, type } }) => {
  const dispatch = useDispatch();

  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);

  const { tags } = useSelector((state) => state.moves);

  const isMobile = false;
  // const isMobile = useCurrentWidth() < 600;
  const isDisabled = modalMode === 'VIEW';

  const defaultValues = generateDefaultValues(type);

  if (data) {
    defaultValues.name = data.name;
    defaultValues.description = data.description;
    if (isExercise(defaultValues) && isExercise(data)) {
      defaultValues.tags = data.tags;
      if (isWorkout(defaultValues) && isWorkout(data)) {
        defaultValues.mode = data.mode;
        defaultValues.rounds = data.rounds;
        defaultValues.rest = data.rest;
        defaultValues.movements = data.movements;
      }
    }
  }

  function getValidationSchema(): yup.ObjectSchema {
    switch (type) {
      case 'WORKOUT':
        return workoutSchema;
      case 'EXERCISE':
        return exerciseSchema;
      case 'TAG':
        return tagSchema;
      default:
        assertNever(type);
    }
  }

  const {
    register,
    unregister,
    control,
    handleSubmit,
    errors,
    watch,
    setValue,
  } = useForm<Movement>({
    defaultValues,
    validationSchema: getValidationSchema(),
  });

  // TODO - update useCurrentWidth to listen on window resize, no setTimeout usage

  type FBCreateFnc = (
    uid: string,
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  type FBUpdateFnc = (
    uid: string,
    id: string,
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

  function getFirebaseFnc(
    mode: 'CREATE' | 'UPDATE',
  ): FBCreateFnc | FBUpdateFnc {
    const isCreate = mode === 'CREATE';

    switch (type) {
      case 'WORKOUT':
        return isCreate ? firebase.workouts : firebase.workout;
      case 'EXERCISE':
        return isCreate ? firebase.exercises : firebase.exercise;
      case 'TAG':
        return isCreate ? firebase.tags : firebase.tag;
      default:
        return assertNever(type);
    }
  }

  function createMovement(formData: Movement): void {
    const firebaseFnc = getFirebaseFnc('CREATE') as FBCreateFnc;

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();

      const postData = {
        id: docRef.id,
        ...formData,
      };
      // adding in for database cleanup
      if ((window as any).Cypress) {
        (window as any).postData = postData;
      }

      docRef
        .set(postData)
        .then(() => {
          batch(() => {
            console.log(`${singleCapString(type)} Added: ${formData.name}`);
            dispatch(setModalMode({ modalMode: 'VIEW' }));
            dispatch(setActiveMove(postData.id)); // set newly created id as active
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser!');
    }
  }

  function updateMovement(formData: Movement): void {
    const firebaseFnc = getFirebaseFnc('UPDATE') as FBUpdateFnc;
    if (authUser && data) {
      firebaseFnc(authUser.uid, data.id)
        .update(formData)
        .then(() => {
          console.log(`${singleCapString(type)} Updated: ${formData.name}`);
          dispatch(setModalMode({ modalMode: 'VIEW' }));
          // moveDispatch({ type: 'MOVE_SET', value: moveData });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser && moveData.id!');
    }
  }

  function onSubmit(formData: Movement): void {
    if (modalMode === 'VIEW') {
      dispatch(setModalMode({ modalMode: 'EDIT' }));
    } else if (modalMode === 'EDIT') {
      data ? updateMovement(formData) : createMovement(formData);
    } else {
      throw Error('Unsupported modalMode provided.');
    }
  }

  // function resetForm(): void {
  //   // Need to reset values manually in order to ensure all fields reset. Some are fine, but Controlled components (TextareaAutosize, React-Select) are weird and need to be done manually
  //   const resetValues = Object.keys(defaultValues).map((key) => {
  //     return { [key]: defaultValues[key] };
  //   });

  //   setValue(resetValues);
  // }

  function handleClose(): void {
    if (modalMode === 'VIEW') {
      batch(() => {
        dispatch(setModalMode({ modalMode: null }));
        // dispatch(clearActiveMove());
      });
    } else if (modalMode === 'EDIT') {
      if (data) {
        dispatch(setModalMode({ modalMode: 'VIEW' }));
      } else {
        batch(() => {
          dispatch(setModalMode({ modalMode: null }));
          // dispatch(clearActiveMove());
          // resetForm();
        });
      }
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
      btnConfig.actionBtn.text = data ? 'Update' : 'Create';
      break;
    default:
      break;
  }

  React.useEffect(() => {
    if (type === 'EXERCISE' || type === 'WORKOUT') {
      /// TS_IGNORE
      register({ name: 'tags' });
      /// TS_IGNORE
      return () => unregister('tags');
    }
  }, [register]);

  // console.log(watch());
  console.log(watch());

  return (
    <MoveFormWrapper onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="text-fields">
        <Input
          name="name"
          type="text"
          label="Name:"
          autoFocus={true}
          register={register()}
          error={errors.name}
          disabled={isDisabled}
        />
        <Textarea
          name="description"
          label="Description:"
          control={control}
          error={errors.description}
          maxRows={4}
          disabled={isDisabled}
        />
        {isWorkout(defaultValues) && (
          <>
            <ModeField
              register={register()}
              formValue={watch()}
              isDisabled={isDisabled}
              error={errors.mode}
            />
            <RestField
              register={register()}
              isDisabled={isDisabled}
              error={errors.rest}
            />
          </>
        )}

        {isExercise(defaultValues) && (
          <TagsField
            tags={tags}
            initTags={defaultValues.tags}
            setValue={setValue}
            isDisabled={isDisabled}
            control={control}
            watch={watch}
          />
        )}
      </div>
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
                {modalMode === 'EDIT' && <AddMoveButton />}
              </Label>
            </>
          )}
        </>
      )} */}
      <ButtonRow config={btnConfig} />
    </MoveFormWrapper>
  );
};

export default MoveForm;
