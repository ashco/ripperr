﻿import { IMovement, IWorkoutModeOption } from './types';

export const workoutModeOptions: IWorkoutModeOption[] = [
  {
    label: '',
    value: '',
  },
  {
    label: 'Reps + Sets',
    value: 'reps-sets',
  },
  {
    label: 'Tabata',
    value: 'tabata',
  },
  {
    label: 'Circuit',
    value: 'circuit',
  },
];

// ===== object examples=====
// manual reps and sets workout
export const manualRepsSetsObj: IMovement = {
  id: '12345678',
  type: 'workout',
  mode: 'reps-sets', // tells how to handle, what to look for in config.
  movements: [
    {
      id: '1111', // id points to exercise
      type: 'exercise', // end of chain, do not to look for movements
      // tells how to handle, what to look for in config.
      config: {
        // mode specific info
        reps: 5,
        sets: 3,
      },
    },
    {
      id: '2222', // id points to exercise
      type: 'exercise', // end of chain, do not to look for movements
      // tells how to handle, what to look for in config.
      config: {
        // mode specific info
        reps: 5,
        sets: 3,
      },
    },
    {
      id: '3333', // id points to exercise
      type: 'exercise', // end of chain, do not to look for movements
      // tells how to handle, what to look for in config.
      config: {
        // mode specific info
        reps: 5,
        sets: 3,
      },
    },
  ],
  rest: {
    automatic: false, // have rest timers automatically run.
    inner: 90, // rest time between reps
    outer: 120, // rest time transitioning between movements array items
  },
};

export const manualCircuitObj: IMovement = {
  id: '12345678',
  type: 'workout',
  mode: 'circuit', // tells how to handle, what to look for in config.
  movements: [
    {
      id: '222223333', // id points to exercise
      type: 'exercise', // end of chain, do not to look for movements
      config: {
        interval: 45, // how long to perform circuit movement
      },
    },
  ],
  rest: {
    automatic: false, // have rest timers automatically run
    inner: 15, // rest time transitioning from one ex to another
    outer: 60, // rest time between full cycles of movements
  },
  // config: {
  //   // mode specific info
  // },
};

// standard tabata workout
export const tabataObj: IMovement = {
  id: '12345678',
  type: 'workout',
  mode: 'circuit', // tells how to handle, what to look for in config.
  movements: [
    {
      id: '222223333', // id points to exercise
      type: 'exercise', // end of chain, do not to look for movements
      config: {
        interval: 20, // how long to perform circuit movement
      },
    },
    {
      id: '222223333', // id points to exercise
      type: 'exercise', // end of chain, do not to look for movements
      config: {
        interval: 20, // how long to perform circuit movement
      },
    },
  ],
  rest: {
    automatic: true, // have rest timers automatically run
    inner: 10, // rest time transitioning from one ex to another
    outer: 10, // rest time between full cycles of movements
  },
  config: {
    // mode specific info
    rounds: 4,
  },
};

// exercise + workout workout
export const chainingObj: IMovement = {
  id: '12345678',
  type: 'workout',
  mode: 'chaining', // tells to perform multiple workouts in a row.
  movements: [
    {
      id: '12345678',
      type: 'workout',
    },
    {
      id: '12345678',
      type: 'workout',
    },
  ],
  rest: {
    automatic: true, // have rest timers automatically run
    inner: null, // inner rest time is handled by movements
    outer: 10, // rest time between movements
  },
};

interface Exercise {
  id: string;
  name: string;
  notes: string;
  history: [];
}

interface Workout {
  id: string;
}

const exerciseObj: IMovement = {
  id: '12345678',
  type: 'exercise',
  name: 'Burpees',
  notes: "Just flop around like you know what you're doing",
  mode: null, //only for workouts
  movements: null, // only for workouts
  rest: null, // only for workouts
  config: null, // only for workouts
  // history: [
  //   {
  //    date
  //    reps
  //   }
  // ]
};

const workoutObj: IMovement = {
  id: '234567',
  type: 'workout',
  name: 'Ab Ripper X',
  notes: 'Tony will be proud',
  mode: 'circuit',
  movements: [
    {
      id: '1111',
      config: {
        interval: 45,
      },
    },
    {
      id: '2222',
      config: {
        interval: 45,
      },
    },
    {
      id: '3333',
      config: {
        interval: 45,
      },
    },
  ],
};
