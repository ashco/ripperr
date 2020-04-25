import { Workout, Exercise } from '../types/types';
import { WorkoutMode, MovementType } from '../types/enums';

export const workoutModeOptions = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Reps',
    value: 'reps',
  },
  {
    label: 'Timed',
    value: 'timed',
  },
];

// // ===== object examples=====
// // manual reps and sets workout
// export const manualRepsSetsObj: IMovement = {
//   id: '12345678',
//   type: 'workout',
//   mode: 'repsSets', // tells how to handle, what to look for in config.
//   movements: [
//     {
//       id: '1111', // id points to exercise
//       type: 'exercise', // end of chain, do not to look for movements
//       // tells how to handle, what to look for in config.
//       config: {
//         // mode specific info
//         reps: 5,
//         sets: 3,
//       },
//     },
//     {
//       id: '2222', // id points to exercise
//       type: 'exercise', // end of chain, do not to look for movements
//       // tells how to handle, what to look for in config.
//       config: {
//         // mode specific info
//         reps: 5,
//         sets: 3,
//       },
//     },
//     {
//       id: '3333', // id points to exercise
//       type: 'exercise', // end of chain, do not to look for movements
//       // tells how to handle, what to look for in config.
//       config: {
//         // mode specific info
//         reps: 5,
//         sets: 3,
//       },
//     },
//   ],
//   rest: {
//     automatic: false, // have rest timers automatically run.
//     inner: 90, // rest time between reps
//     outer: 120, // rest time transitioning between movements array items
//   },
// };

// export const manualCircuitObj: IMovement = {
//   id: '12345678',
//   type: 'workout',
//   mode: 'circuit', // tells how to handle, what to look for in config.
//   movements: [
//     {
//       id: '222223333', // id points to exercise
//       type: 'exercise', // end of chain, do not to look for movements
//       config: {
//         duration: 45, // how long to perform circuit movement
//       },
//     },
//   ],
//   rest: {
//     automatic: false, // have rest timers automatically run
//     inner: 15, // rest time transitioning from one ex to another
//     outer: 60, // rest time between full cycles of movements
//   },
//   // config: {
//   //   // mode specific info
//   // },
// };

// // standard tabata workout
// export const tabataObj: IMovement = {
//   id: '12345678',
//   type: 'workout',
//   mode: 'circuit', // tells how to handle, what to look for in config.
//   movements: [
//     {
//       id: '222223333', // id points to exercise
//       type: 'exercise', // end of chain, do not to look for movements
//       config: {
//         duration: 20, // how long to perform circuit movement
//       },
//     },
//     {
//       id: '222223333', // id points to exercise
//       type: 'exercise', // end of chain, do not to look for movements
//       config: {
//         duration: 20, // how long to perform circuit movement
//       },
//     },
//   ],
//   rest: {
//     automatic: true, // have rest timers automatically run
//     inner: 10, // rest time transitioning from one ex to another
//     outer: 10, // rest time between full cycles of movements
//   },
//   config: {
//     // mode specific info
//     rounds: 4,
//   },
// };

// // exercise + workout workout
// export const chainingObj: IMovement = {
//   id: '12345678',
//   type: 'workout',
//   mode: 'chaining', // tells to perform multiple workouts in a row.
//   movements: [
//     {
//       id: '12345678',
//       config: null,
//     },
//     {
//       id: '12345678',
//       config: null,
//     },
//   ],
//   rest: {
//     automatic: true, // have rest timers automatically run
//     inner: null, // inner rest time is handled by movements
//     outer: 10, // rest time between movements
//   },
// };

// interface Exercise {
//   id: string;
//   name: string;
//   description: string;
//   history: [];
// }

// interface Workout {
//   id: string;
// }

// export const workoutObj: Workout = {
//   id: '5678',
//   type: MovementType.Workout,
//   name: 'Morning Stretch Routine',
//   description: 'This routine will get you ready for the day in less than 10 minutes!',
//   tags: ['stretch'],
//   history: [],
//   mode: WorkoutMode.Reps,
//   movements: [
//     {
//       id: '1111',
//       config: {
//         duration: 45,
//       },
//     },
//     {
//       id: '2222',
//       config: {
//         duration: 45,
//       },
//     },
//   ],
//   rest: {
//     automatic: true, // have rest timers automatically run
//     inner: 15, // rest time transitioning from one ex to another
//     outer: 60, // rest time between full cycles of movements
//   },
//   config: {
//     // mode specific info
//     rounds: 4,
//   },
// };

// export const exerciseObj: Exercise = {
//   id: '1234',
//   type: MovementType.Exercise,
//   name: 'Toe touches',
//   description: 'Penny picker upper.',
//   tags: ['stretch'],
//   history: [
//     {
//       time: '12-2-2:13:00:11',
//     },
//   ],
// };
