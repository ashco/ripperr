﻿import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode } from 'store/ui';
import { setActiveMove, clearActiveMove, ID } from 'store/moves';
import { useForm, Controller } from 'react-hook-form';

import TextareaAutosize from 'react-textarea-autosize';

import AuthUserContext from 'context/AuthUserContext';
import FirebaseContext from 'context/FirebaseContext';

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
import { MoveDataType } from 'utils/lookup-move';
import { ModalMode } from 'store/ui';

import { ButtonRowProps, MovementType } from 'types/types';
import { Movement } from 'store/moves';

type FormData = {
  name: string;
  description: string;
  // tags: ID[];
};

const MovementForm: React.FC<{
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
  }

  const { register, handleSubmit } = useForm<FormData>({ defaultValues });
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

  // ========= MOVEMENT FUNCTIONS =========
  // function updateMovement(moveData: Movement): void {
  //   let firebaseFnc;

  //   switch (moveData.type) {
  //     case MovementType.Archetype:
  //       firebaseFnc = firebase.archetype;
  //       break;
  //     case MovementType.Exercise:
  //       firebaseFnc = firebase.exercise;
  //       break;
  //     case MovementType.Workout:
  //       firebaseFnc = firebase.workout;
  //       break;
  //     default:
  //       throw Error('moveData type is not recognized');
  //   }

  //   if (authUser && moveData.id) {
  //     // const moveObj: Movement = { ...moveData };
  //     // moveData.lastModified = firebase.getTimestamp();

  //     firebaseFnc(authUser.uid, moveData.id)
  //       .update(moveData)
  //       .then(() => {
  //         console.log(
  //           `${singleCapString(moveData.type)} Updated: ${moveData.name}`,
  //         );
  //         console.log(moveData);
  //         console.log(watch());

  //         dispatch(setModalMode('VIEW'));
  //         // moveDispatch({ type: 'MOVE_SET', value: moveData });
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   } else {
  //     throw Error('There is no authUser && moveData.id!');
  //   }
  // }

  type FBCreateFnc = (
    uid: string,
  ) => firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
  type FBUpdateFnc = (
    uid: string,
    id: string,
  ) => firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

  function getFirebaseFnc({
    mode,
  }: {
    mode: 'CREATE' | 'UPDATE';
  }): FBCreateFnc | FBUpdateFnc {
    let firebaseFnc;
    if (mode === 'CREATE') {
      switch (type) {
        case 'TAG':
          firebaseFnc = firebase.archetypes;
          break;
        case 'EXERCISE':
          firebaseFnc = firebase.exercises;
          break;
        case 'WORKOUT':
          firebaseFnc = firebase.workouts;
          break;
        default:
          throw Error('type is not recognized');
      }
    } else if (mode === 'UPDATE') {
      switch (type) {
        case 'TAG':
          firebaseFnc = firebase.archetype;
          break;
        case 'EXERCISE':
          firebaseFnc = firebase.exercise;
          break;
        case 'WORKOUT':
          firebaseFnc = firebase.workout;
          break;
        default:
          throw Error('type is not recognized');
      }
    } else {
      throw Error('I really cant help anymore');
    }
    return firebaseFnc;
  }

  function createMovement(formData: FormData): void {
    const firebaseFnc = getFirebaseFnc({ mode: 'CREATE' }) as FBCreateFnc;

    if (authUser) {
      const docRef = firebaseFnc(authUser.uid).doc();

      const postData = {
        id: docRef.id,
        ...formData,
      };

      docRef
        .set(postData)
        .then(() => {
          console.log(`${singleCapString(type)} Added: ${formData.name}`);
          dispatch(setModalMode({ modalMode: 'VIEW' }));
          dispatch(setActiveMove(postData.id)); // set newly created id as active
          // batch(() => {
          //   // moveDispatch({ type: 'MOVE_SET', value: moveData });
          // });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      throw Error('There is no authUser!');
    }

    // switch (type) {
    //   case 'TAG':
    //     firebaseFnc = firebase.archetypes;
    //     break;
    //   case 'EXERCISE':
    //     firebaseFnc = firebase.exercises;
    //     break;
    //   case 'WORKOUT':
    //     firebaseFnc = firebase.workouts;
    //     break;
    //   default:
    //     throw Error('type is not recognized');
    // }

    // if (authUser) {
    //   const docRef = firebaseFnc(authUser.uid).doc();
    //   // TODO Check that name is unique

    //   // moveData.lastModified = firebase.getTimestamp();

    //   console.log(moveData);
    //   const data = {};

    //   docRef
    //     .set(moveData)
    //     .then(() => {
    //       console.log(
    //         `${singleCapString(moveData.type)} Added: ${moveData.name}`,
    //       );
    //       batch(() => {
    //         dispatch(setModalMode('VIEW'));
    //         dispatch(setActiveMove(docRef.id)); // set newly created id as active
    //         // moveDispatch({ type: 'MOVE_SET', value: moveData });
    //       });
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // } else {
    //   throw Error('There is no authUser!');
    // }
  }

  function onSubmit(formData: FormData) {
    if (modalMode === 'VIEW') {
      dispatch(setModalMode({ modalMode: 'EDIT' }));
    } else if (modalMode === 'EDIT') {
      // const moveData = {
      //   ...(moveState as Movement),
      //   ...formData,
      // };

      console.log(formData);

      // activeId ? updateMovement(formData) : createMovement(formData);
      createMovement(formData);
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
        // moveDispatch({ type: 'MOVE_CLEAR' });
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
                {modalMode === 'EDIT' && <AddMovementButton />}
              </Label>
            </>
          )}
        </>
      )} */}
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
          <ArchetypesField
            tags={watch().tags}
            setValue={setValue}
            isDisabled={isDisabled}
            control={control}
            watch={watch}
          />
        </Label>
      )} */}
      <ButtonRow config={btnConfig} />
    </MovementFormWrapper>
  );
};

export default MovementForm;
