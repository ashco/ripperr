import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WorkoutDict, ExerciseDict, TagDict, MovesState } from 'types';

interface SetMoves {
  workouts?: WorkoutDict;
  exercises?: ExerciseDict;
  tags?: TagDict;
}

export const initialState: MovesState = {
  activeId: null,
  workouts: null,
  exercises: null,
  tags: null,
  error: null,
};

const movesSlice = createSlice({
  name: 'moves',
  initialState,
  reducers: {
    setMoves(state, action: PayloadAction<SetMoves>) {
      const { workouts, exercises, tags } = action.payload;

      if (workouts) state.workouts = { byId: workouts, allIds: [] };
      if (exercises) state.exercises = { byId: exercises, allIds: [] };
      if (tags) state.tags = { byId: tags, allIds: [] };
    },

    setActiveMove(state, action: PayloadAction<string>) {
      state.activeId = action.payload;
    },
    clearActiveMove(state) {
      state.activeId = null;
    },
  },
});

export const { setMoves, setActiveMove, clearActiveMove } = movesSlice.actions;

export default movesSlice.reducer;

// const initialState: MovesState = {
//   workouts: {
//     byId: {
//       workout1: {
//         id: 'workout1', // '4EkUv4E6ByZwhD8al7OK'
//         lastModified: 1234,
//         name: 'strength 1',
//         description: '',
//         tags: ['tag1', 'tag2'],
//         mode: ['SETS', 'REPS'],
//         config: {
//           rounds: null,
//           rest: {
//             auto: true,
//             inner: 45000, // 45 second rest between sets
//             outer: 120000, // 2 minute rest during transition to next movement
//           },
//         },
//         // this is the important part
//         movements: [
//           {
//             type: 'EXERCISE',
//             id: 'exercise1',
//             // array with 3 entries. config.length = sets
//             config: [
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//             ],
//           },
//           {
//             type: 'EXERCISE',
//             id: 'exercise2',
//             config: [
//               {
//                 reps: 250,
//                 interval: null,
//                 weight: null,
//               },
//               {
//                 reps: 250,
//                 interval: null,
//                 weight: null,
//               },
//             ],
//           },
//         ],
//       },
//       workout2: {
//         id: 'workout2',
//         lastModified: 1234,
//         name: 'murph',
//         description: '',
//         tags: ['tag1', 'tag4'],
//         mode: ['CIRCUIT', 'TIMED'],
//         config: {
//           rounds: 4, // specified if circuit. Nothing like this for sets because that's handled by counting movement config length.
//           rest: {
//             auto: true,
//             inner: 30000,
//             outer: 30000,
//           },
//         },
//         movements: [
//           {
//             type: 'EXERCISE',
//             id: 'exercise1',
//             config: [
//               {
//                 reps: null,
//                 interval: 60000,
//                 weight: 25,
//               },
//               {
//                 reps: null,
//                 interval: 60000,
//                 weight: 25,
//               },
//               {
//                 reps: null,
//                 interval: 60000,
//                 weight: 25,
//               },
//               {
//                 reps: null,
//                 interval: 60000,
//                 weight: 25,
//               },
//             ],
//           },
//         ],
//       },
//       workout3: {
//         id: 'workout3',
//         lastModified: 1234,
//         name: 'workout inception',
//         description: '',
//         tags: ['tag1'],
//         mode: ['SETS', 'REPS'],
//         config: {
//           rounds: null, // specified if circuit. Nothing like this for sets because that's handled by counting movement config length.
//           rest: {
//             auto: false,
//             inner: null,
//             outer: null,
//           },
//         },
//         movements: [
//           {
//             type: 'EXERCISE',
//             id: 'exercise1',
//             // array with 3 entries. config.length = sets
//             config: [
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//             ],
//           },
//           {
//             type: 'WORKOUT',
//             id: 'workout1',
//             config: [
//               // different object shape because it's a workout
//               {
//                 reps: 10,
//                 interval: null,
//                 weight: 40,
//               },
//             ],
//           },
//         ],
//       },
//     },
//     allIds: ['workout1', 'workout2'],
//   },
//   exercises: {
//     byId: {
//       exercise1: {
//         id: 'exercise1',
//         lastModified: 1234,
//         name: 'burpee',
//         description: '',
//         tags: ['tag1', 'tag2'],
//       },
//       exercise2: {
//         id: 'exercise2',
//         lastModified: 1234,
//         name: 'jumping jacks',
//         description: '',
//         tags: ['tag1', 'tag4'],
//       },
//     },
//     allIds: ['exercise1', 'exercise2'],
//   },
//   tags: {
//     byId: {
//       tag1: {
//         id: 'tag1',
//         lastModified: 1234,
//         name: 'push',
//         description: '',
//       },
//       tag2: {
//         id: 'tag2',
//         lastModified: 1234,
//         name: 'pull',
//         description: '',
//       },
//     },
//     allIds: ['tag1', 'tag2', 'tag3', 'tag4'],
//   },
//   loading: false,
//   error: null,
// };
