// import React, { useState, useEffect, useContext } from 'react';

export const filler = '';

// import AuthUserContext from 'context/AuthUserContext';
// import FirebaseContext from 'context/FirebaseContext';

// import { sortTags } from '../utils/sort-movements';

// export const INITIAL_ARCHETYPE_STATE: ITagsFirebaseQuery = {
//   loading: true,
//   tags: [],
// };

// export const INITIAL_EXERCISE_STATE: IExercisesFirebaseQuery = {
//   loading: true,
//   exercises: [],
// };

// export const INITIAL_WORKOUT_STATE: IWorkoutsFirebaseQuery = {
//   loading: true,
//   workouts: [],
// };

// export const INITIAL_MOVEMENT_STATE: IMovementState = {
//   loading: true,
//   tags: [],
//   exercises: [],
//   workouts: [],
// };

// const withMovements = (Component: any) => {
//   const WithMovements = (props: any) => {
//     const firebase = useContext(FirebaseContext);
//     const authUser = useContext(AuthUserContext);

//     const [tagState, setTagState] = useState(
//       INITIAL_ARCHETYPE_STATE,
//     );
//     const [exerciseState, setExerciseState] = useState(INITIAL_EXERCISE_STATE);
//     const [workoutState, setWorkoutState] = useState(INITIAL_WORKOUT_STATE);

//     // ARCHETYPE EFFECT
//     useEffect(() => {
//       setTagState({ ...tagState, loading: true });

//       if (authUser) {
//         const unsubscribe = firebase
//           .tags(authUser.uid)
//           .onSnapshot((snapshot) => {
//             const tagList: Tag[] = [];

//             snapshot.forEach((doc) => {
//               const {
//                 lastModified,
//                 type,
//                 name,
//                 description,
//                 // history,
//               } = doc.data();
//               const obj: Tag = {
//                 id: doc.id,
//                 lastModified,
//                 type,
//                 name,
//                 description,
//                 // history,
//               };

//               tagList.push(obj);
//             });

//             setTagState({
//               loading: false,
//               tags: tagList.sort((a, b) => sortTags(a, b)),
//             });

//             return (): void => unsubscribe();
//           });
//       }
//     }, []);

//     // EXERCISE EFFECT
//     useEffect(() => {
//       setExerciseState({ ...exerciseState, loading: true });

//       if (authUser) {
//         const unsubscribe = firebase
//           .exercises(authUser.uid)
//           .onSnapshot((snapshot) => {
//             const exerciseList: Exercise[] = [];

//             snapshot.forEach((doc) => {
//               const {
//                 lastModified,
//                 type,
//                 name,
//                 description,
//                 tags,
//                 // history,
//               } = doc.data();
//               const obj: Exercise = {
//                 id: doc.id,
//                 lastModified,
//                 type,
//                 name,
//                 description,
//                 tags,
//                 // history,
//               };

//               exerciseList.push(obj);
//             });

//             setExerciseState({
//               loading: false,
//               exercises: exerciseList,
//             });

//             return (): void => unsubscribe();
//           });
//       }
//     }, []);

//     // WORKOUT EFFECT
//     useEffect(() => {
//       setWorkoutState({ ...workoutState, loading: true });

//       if (authUser) {
//         const unsubscribe = firebase
//           .workouts(authUser.uid)
//           .onSnapshot((snapshot) => {
//             const workoutList: Workout[] = [];

//             snapshot.forEach((doc) => {
//               const {
//                 lastModified,
//                 type,
//                 name,
//                 description,
//                 tags,
//                 // history,
//                 mode,
//                 movements,
//                 rest,
//                 config,
//               } = doc.data();

//               const obj: Workout = {
//                 id: doc.id,
//                 lastModified,
//                 type,
//                 name,
//                 description,
//                 tags,
//                 // history,
//                 mode,
//                 movements,
//                 rest,
//                 config,
//               };

//               workoutList.push(obj);
//             });

//             setWorkoutState({
//               loading: false,
//               workouts: workoutList,
//             });

//             return (): void => unsubscribe();
//           });
//       }
//     }, []);

//     const moveState: IMovementState = {
//       tags: tagState.tags,
//       exercises: exerciseState.exercises,
//       workouts: workoutState.workouts,
//       loading: exerciseState.loading || workoutState.loading,
//     };

//     return (
//       <MovementListContext.Provider value={moveState}>
//         <Component {...props} />
//       </MovementListContext.Provider>
//     );
//   };

//   return WithMovements;
// };

// export default withMovements;
