import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { setActiveMove, clearActiveMove } from 'store/moves';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import Textarea from 'components/Textarea';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';

import MoveFormWrapper from './style';

import TagsField from './TagsField';
// import Label from './Label';
// import ModeField from './ModeField';
// import MovementsField from './MovementsField';
// import RestField from './RestField';
import ButtonRow from 'components/ButtonRow';

import useCurrentWidth from 'hooks/useCurrentWidth';
import singleCapString from 'utils/single-cap-string';
// import { MoveDataType } from 'utils/lookup-move@';

import { Movement, ButtonRowProps, MovementType, ModalMode } from 'types';
import Input from 'components/Input';

import {
  tagSchema,
  exerciseSchema,
  workoutSchema,
} from 'utils/validation-schema';
import assertNever from 'utils/assert-never';

export type FormData = {
  name: string;
  description: string;
};

const MoveForm: React.FC<{
  activeId: string | null;
  modalMode: ModalMode;
  move: {
    data: Movement | null;
    type: MovementType;
  };
}> = ({ activeId, modalMode, move: { data, type } }) => {
  const dispatch = useDispatch();

  const firebase = React.useContext(FirebaseContext);
  const authUser = React.useContext(AuthUserContext);

  const isMobile = false;
  // const isMobile = useCurrentWidth() < 600;
  const isDisabled = modalMode === 'VIEW';
  // const isNewEntry = !data;

  const defaultValues: FormData = {
    name: '',
    description: '',
  };

  if (data) {
    defaultValues.name = data.name;
    defaultValues.description = data.description;
    if (type === 'EXERCISE' || type === 'WORKOUT') {
      // defaultValues.tags = data.tags;
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

  const { register, control, handleSubmit, errors, watch, setValue } = useForm<
    FormData
  >({
    defaultValues,
    validationSchema: getValidationSchema(),
  });
  // const defaultValues: any = {
  // name: (moveState as Movement).name,
  // description: (moveState as Movement).description,
  // tags: [...(moveState as Exercise | Workout).tags],
  // };

  // TODO - update useCurrentWidth to listen on window resize, no setTimeout usage

  // const {
  //   control,
  //   register,
  //   unregister,
  //   reset,
  //   watch,
  //   errors,
  //   handleSubmit,
  //   setValue,
  // } = useForm<FormData>({
  //   defaultValues,
  // });

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

  function createMovement(formData: FormData): void {
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

  function updateMovement(formData: FormData): void {
    const firebaseFnc = getFirebaseFnc('UPDATE') as FBUpdateFnc;
    if (authUser && activeId) {
      firebaseFnc(authUser.uid, activeId)
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

  function onSubmit(formData: FormData): void {
    if (modalMode === 'VIEW') {
      dispatch(setModalMode({ modalMode: 'EDIT' }));
    } else if (modalMode === 'EDIT') {
      activeId ? updateMovement(formData) : createMovement(formData);
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
        dispatch(setModalMode({ modalMode: 'CLOSED' }));
        dispatch(clearActiveMove());
      });
    } else if (modalMode === 'EDIT') {
      if (activeId) {
        dispatch(setModalMode({ modalMode: 'VIEW' }));
      } else {
        batch(() => {
          dispatch(setModalMode({ modalMode: 'CLOSED' }));
          dispatch(clearActiveMove());
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
      btnConfig.actionBtn.text = activeId ? 'Update' : 'Create';
      break;
    default:
      break;
  }

  // React.useEffect(() => {
  //   register({ name: 'tags' });

  //   return () => unregister('tags');
  // }, [register]);

  // console.log(watch());

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
        {/* <Controller
          as={<Textarea maxRows={4} />}
          name="description"
          control={control}
          // disabled={isDisabled}
        /> */}
        {/* <Input
          name="description"
          type="text"
          label="Description:"
          register={register()}
          error={errors.description}
        /> */}
      </div>
      {/* <Label
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
      </Label> */}
      {/* <Label
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
      </Label> */}
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
      <TagsField
        // tags={watch().tags}
        setValue={setValue}
        isDisabled={isDisabled}
        control={control}
        watch={watch}
      />
      {/* {(moveState?.type === MovementType.Exercise ||
        moveState?.type === MovementType.Workout) && (
        <Label
          text="Tags:"
          display={
            isDisabled && !(moveState as Exercise | Workout).tags.length
              ? 'none'
              : 'block'
          }
        >
          <TagsField
            tags={watch().tags}
            setValue={setValue}
            isDisabled={isDisabled}
            control={control}
            watch={watch}
          />
        </Label>
      )} */}
      <ButtonRow config={btnConfig} />
    </MoveFormWrapper>
  );
};

export default MoveForm;
