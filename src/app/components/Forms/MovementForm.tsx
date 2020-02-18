// import React, { useState, useContext, useReducer } from 'react';
// import styled from 'styled-components';
// import { toast } from 'react-toastify';

// import {
//   AuthUserContext,
//   FirebaseContext,
//   MovementListContext,
// } from '../../context';
// import {
//   handleChange,
//   handleValidation,
//   validateForm,
// } from '../../common/formHelpers';

// import {
//   FirstFields,
//   TagField,
//   RepsField,
//   TimedField,
//   RestField,
//   ModeField,
//   ButtonRow,
// } from './index';
// import { MovementFormWrapper } from './styles';

// import {
//   IHandleChange,
//   Movement,
//   Archetype,
//   Exercise,
//   Workout,
//   IMovementFormState,
//   ArchetypeFormState,
//   IArchetypeFormErrors,
//   ExerciseFormState,
//   IExerciseFormErrors,
//   WorkoutFormState,
//   IWorkoutFormErrors,
//   IButtonRowBtn,
//   IFormReducerAction,
// } from '../../common/types';
// import {
//   FormMode,
//   MovementType,
//   WorkoutMode,
//   FormFieldProp,
//   FormActionType,
// } from '../../common/enums';

// const INITIAL_MOVE_STATE_AR: ArchetypeFormState = {
//   name: '',
//   description: '',
// };
// const INITIAL_MOVE_STATE_EX: ExerciseFormState = {
//   name: '',
//   description: '',
//   tags: [],
// };
// const INITIAL_MOVE_STATE_WO: WorkoutFormState = {
//   name: '',
//   description: '',
//   tags: [],
//   mode: WorkoutMode.Reps,
//   movements: [
//     {
//       id: '',
//       name: '',
//       reps: 0,
//       sets: 0,
//       duration: 0,
//     },
//   ],
//   rest: {
//     auto: true,
//     inner: 45,
//     outer: 60,
//   },
//   config: {
//     // TIMED
//     rounds: 1,
//   },
// };

// const INITIAL_ERROR_VALUES_AR: IArchetypeFormErrors = {
//   name: '',
//   description: '',
// };
// const INITIAL_ERROR_VALUES_EX: IExerciseFormErrors = {
//   name: '',
//   description: '',
//   tags: '',
// };
// const INITIAL_ERROR_VALUES_WO: IWorkoutFormErrors = {
//   name: '',
//   description: '',
//   tags: '',
//   // mode: '',
//   // movements: [''],
//   // rest: '',
//   // config: {
//   //   rounds: '',
//   // },
// };

// const MovementForm: React.FC<{
//   movementType: MovementType;
//   formMode: FormMode;
//   movement?: Movement;
//   hide: () => void;
// }> = ({ formMode, movementType, movement, hide }) => {
//   const firebase = useContext(FirebaseContext);
//   const authUser = useContext(AuthUserContext);
//   const { archetypes, exercises, workouts } = useContext(MovementListContext);

//   // ============ SET UP FORM STATE ============
//   let initialFormState: Movement | IMovementFormState;

//   if (movement) {
//     initialFormState = movement;
//   } else {
//     if (movementType === MovementType.Archetype) {
//       initialFormState = INITIAL_MOVE_STATE_AR;
//     } else if (movementType === MovementType.Exercise) {
//       initialFormState = INITIAL_MOVE_STATE_EX;
//     } else if (movementType === MovementType.Workout) {
//       initialFormState = INITIAL_MOVE_STATE_WO;
//     } else {
//       return <div>No movement object or movementType set!</div>;
//     }
//   }
//   // if (
//   //   (movement && formMode === FormMode.View) ||
//   //   (movement && formMode === FormMode.Edit)
//   // ) {
//   //   initialFormState = movement;
//   // } else if (movementType === MovementType.Archetype) {
//   //   initialFormState = INITIAL_MOVE_STATE_AR;
//   // } else if (movementType === MovementType.Exercise) {
//   //   initialFormState = INITIAL_MOVE_STATE_EX;
//   // } else if (movementType === MovementType.Workout) {
//   //   initialFormState = INITIAL_MOVE_STATE_WO;
//   // } else {
//   //   return <div>This will never show</div>;
//   // }

//   let movementText = '';
//   let initialErrorValues;
//   if (movementType === MovementType.Archetype) {
//     movementText = 'Archetype';
//     initialErrorValues = INITIAL_ERROR_VALUES_AR;
//   } else if (movementType === MovementType.Exercise) {
//     movementText = 'Exercise';
//     initialErrorValues = INITIAL_ERROR_VALUES_EX;
//   } else if (movementType === MovementType.Workout) {
//     movementText = 'Workout';
//     initialErrorValues = INITIAL_ERROR_VALUES_WO;
//   } else {
//     return <div>Make this error handling cleaner</div>;
//   }

//   // const [form, setForm] = useState(initialFormState);
//   const [errors, setErrors] = useState(initialErrorValues);

//   // ============ FORM REDUCER ============

//   // const initialState: ExerciseFormState = {
//   //   name: '',
//   //   description: '',
//   //   tags: [],
//   // };

//   // interface IFormReducerAction {
//   //   type: FormActionType;
//   //   value: string;
//   // }

//   function formReducer(
//     state: IMovementFormState,
//     action: IFormReducerAction,
//   ): IMovementFormState {
//     switch (action.type) {
//       case FormActionType.Name:
//         return { ...state, name: action.value };
//       case FormActionType.Description:
//         return { ...state, description: action.value };
//       case FormActionType.Tag:
//         if (
//           movementType !== MovementType.Exercise &&
//           movementType !== MovementType.Workout
//         ) {
//           throw Error();
//         }

//         return { ...state, tags: [...state.tags, action.value] };
//       // case FormActionType.RemoveTag: {
//       //   if (
//       //     movementType !== MovementType.Exercise &&
//       //     movementType !== MovementType.Workout
//       //   ) {
//       //     throw Error();
//       //   }
//       //   const tags = (state as
//       //     | ExerciseFormState
//       //     | WorkoutFormState).tags.filter((tag) => tag === action.value);
//       //   return { ...state, tags };
//       // }
//       default:
//         throw Error();
//     }
//   }

//   const [form, movementDispatch] = useReducer(formReducer, initialFormState);

//   // ============ FORMMODE SPECIFIC VALUES ============

//   const text = {
//     title: '',
//     submitButton: '',
//   };
//   const cancelBtn: IButtonRowBtn = {
//     text: '',
//   };
//   const actionBtn: IButtonRowBtn = {
//     text: '',
//   };

//   if (formMode === FormMode.Add) {
//     text.title = `Create New ${movementText}`;
//     text.submitButton = 'Submit';
//     cancelBtn.text = 'Cancel';
//     cancelBtn.onClick = hide;
//     actionBtn.text = 'Create';
//   } else if (formMode === FormMode.Edit) {
//     text.title = `Edit ${movementText}`;
//     text.submitButton = 'Update';
//     cancelBtn.text = 'Cancel';
//     cancelBtn.onClick = hide; // switch to view mode
//     actionBtn.text = 'Update';
//   } else if (formMode === FormMode.View) {
//     text.title = `View ${movementText}`;
//     text.submitButton = 'Update';
//     cancelBtn.text = 'Close';
//     cancelBtn.onClick = hide;
//     actionBtn.text = 'Edit';
//     // actionBtn.onClick = edit; // switch to edit mode
//   }

//   const showTagField =
//     movementType === MovementType.Workout ||
//     movementType === MovementType.Exercise;

//   // ============ FIREBASE FUNCTIONS ============

//   function handleCreateMovement(form: IMovementFormState): void {
//     let firebaseFnc;
//     let movementList;
//     if (movementType === MovementType.Archetype) {
//       firebaseFnc = firebase.archetypes;
//       movementList = archetypes;
//     } else if (movementType === MovementType.Exercise) {
//       firebaseFnc = firebase.exercises;
//       movementList = exercises;
//     } else if (movementType === MovementType.Workout) {
//       firebaseFnc = firebase.workouts;
//       movementList = workouts;
//     } else {
//       console.log('No MovementType specified!');
//       return;
//     }

//     if (authUser) {
//       const docRef = firebaseFnc(authUser.uid).doc();

//       // Check that name is unique
//       const moveNames = movementList.map((move) => move.name);
//       if (moveNames.includes(form.name)) {
//         toast.error(`${movementText} name is already in use.`);
//         return;
//       }

//       const movementObj: Movement = {
//         id: docRef.id,
//         lastModified: firebase.getTimestamp(),
//         type: movementType,
//         name: form.name,
//         description: form.description,
//         history: [],
//       };

//       if (movementType === MovementType.Archetype) {
//         // Add nothing..
//       } else if (movementType === MovementType.Exercise) {
//         (movementObj as Exercise).tags = form.tags;
//       } else if (movementType === MovementType.Workout) {
//         (movementObj as Workout).tags = form.tags;
//         (movementObj as Workout).mode = form.mode;
//         (movementObj as Workout).movements = form.movements;
//         (movementObj as Workout).rest = form.rest;
//         (movementObj as Workout).config = {};
//       }

//       docRef
//         .set(movementObj)
//         .then(() => {
//           console.log(`${movementText} Added: ${movementObj.name}`);
//           hide();
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     } else {
//       console.log('There is no authUser!');
//     }
//   }

//   function handleUpdateMovement(form: IMovementFormState): void {
//     let firebaseFnc;
//     let movementList;
//     if (movementType === MovementType.Archetype) {
//       firebaseFnc = firebase.archetype;
//       movementList = archetypes;
//     } else if (movementType === MovementType.Exercise) {
//       firebaseFnc = firebase.exercise;
//       movementList = exercises;
//     } else if (movementType === MovementType.Workout) {
//       firebaseFnc = firebase.workout;
//       movementList = workouts;
//     } else {
//       console.log('No MovementType specified!');
//       return;
//     }

//     if (authUser && movement) {
//       // Check that name is unique or matches with current id
//       const moveNames = movementList.map((move) => move.name);
//       if (moveNames.includes(form.name) && movement.name !== form.name) {
//         toast.error(`${movementText} name is already in use.`);
//         return;
//       }

//       const movementObj: ExerciseFormState = {
//         lastModified: firebase.getTimestamp(),
//         name: form.name,
//         description: form.description,
//         tags: form.tags,
//       };

//       firebaseFnc(authUser.uid, movement.id)
//         .update(movementObj)
//         .then(() => {
//           console.log(`${movementText} Updated: ${movementObj.name}`);
//           hide();
//         })
//         .catch((err) => {
//           console.error(err);
//         });
//     } else {
//       console.log('There is no authUser || movement!');
//     }
//   }

//   // ============ FORM FUNCTIONS ============

// function handleChangeForm(e: IHandleChange): void {
//   handleChange(e, form, setForm);
//   handleValidation(e, errors, setErrors);
// }

// function handleChangeFormMovement(e: IHandleChange, i: number): void {
//   handleChange(e, form, setForm, {
//     type: FormFieldProp.Movements,
//     index: i,
//   });
// }

// function handleChangeFormRest(e: IHandleChange): void {
//   handleChange(e, form, setForm, { type: FormFieldProp.Rest });
// }

// function handleChangeFormConfig(e: IHandleChange): void {
//   handleChange(e, form, setForm, { type: FormFieldProp.Config });
// }

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
//     e.preventDefault();

//     if (validateForm(errors)) {
//       if (formMode === FormMode.Add) {
//         handleCreateMovement(form);
//       } else if (formMode === FormMode.Edit) {
//         handleUpdateMovement(form);
//       }
//     } else {
//       toast.error('There is a problem with your configuration..');
//     }
//   }

//   // // ============ MOVEMENT FIELD HANDLERS ============

// function handleAddMovementRef(mode: WorkoutMode): void {
//   const newForm = { ...form };

//   const newMovement: IMovementRefs = {
//     id: '',
//     name: '',
//     reps: 0,
//     sets: 0,
//     duration: 0,
//   };

//   newForm.movements.push(newMovement);
//   setForm(newForm);
// }

// function handleDeleteMovementRef(i: number): void {
//   const newForm = { ...form };

//   newForm.movements.splice(i, 1);
//   setForm(newForm);
// }

//   return (
//     <ExerciseFormWrapper>
//       <h1>{text.title}</h1>
//       <form
//         onSubmit={handleSubmit}
//         className={formMode === FormMode.View ? 'view-mode' : 'edit-mode'}
//         noValidate
//       >
//         <FirstFields
//           form={form}
//           errors={errors}
//           formMode={formMode}
//           movementDispatch={movementDispatch}
//         />
//         {showTagField && (
//           <TagField
//             form={form as ExerciseFormState | WorkoutFormState}
//             movementDispatch={movementDispatch}
//             archetypes={archetypes}
//           />
//         )}
//         {/* <ModeField
//           form={form}
//           errors={errors}
//           handleChange={handleChangeForm}
//           handleChangeConfig={handleChangeFormConfig}
//         />
//         {renderMovementFields()}
//         <button
//           type="button"
//           className="add-btn"
//           onClick={() => handleAddMovementRef(form.mode)}
//         >
//           +
//         </button>{' '}
//         <RestField form={form} handleChange={handleChangeFormRest} /> */}
//         <ButtonRow cancelBtn={cancelBtn} actionBtn={actionBtn} />
//       </form>
//     </ExerciseFormWrapper>
//   );
// };

// const ExerciseFormWrapper = styled(MovementFormWrapper)`
//   width: ${(p) => p.theme.space[13]};
// `;

// export default MovementForm;
