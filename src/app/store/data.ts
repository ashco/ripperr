import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ID = string; // make this specific length;

interface Tag {
  readonly id: ID;
  // lastModified: firebase.firestore.FieldValue | firebase.firestore.Timestamp;
  lastModified: number; // changing to this for now
  name: string;
  description: string;
}

interface Exercise extends Tag {
  tags: string[];
}

type WorkoutMode1 = 'SETS' | 'CIRCUIT' | null;
type WorkoutMode2 = 'REPS' | 'TIMED' | null;

interface WorkoutRest {
  auto: boolean;
  inner: number | null;
  outer: number | null;
}

interface WorkoutConfig {
  rounds: number | null;
  rest: WorkoutRest;
}

interface MoveRefConfig {
  reps: number | null;
  weight: number | null;
  interval: number | null;
}

interface MoveRef {
  type: 'EXERCISE' | 'WORKOUT';
  id: ID;
  config: MoveRefConfig[];
}

interface Workout extends Exercise {
  mode: [WorkoutMode1, WorkoutMode2];
  config: WorkoutConfig;
  movements: MoveRef[];
}

interface TagDict {
  [key: string]: Tag;
}
interface ExerciseDict {
  [key: string]: Exercise;
}
interface WorkoutDict {
  [key: string]: Workout;
}

interface DataState {
  workouts: {
    byId: WorkoutDict;
    allIds: string[];
  };
  exercises: {
    byId: ExerciseDict;
    allIds: string[];
  };
  tags: {
    byId: TagDict;
    allIds: string[];
  };
}

const initialState: DataState = {
  workouts: {
    byId: {
      workout1: {
        id: 'workout1', // '4EkUv4E6ByZwhD8al7OK'
        lastModified: 1234,
        name: 'strength 1',
        description: '',
        tags: ['tag1', 'tag2'],
        mode: ['SETS', 'REPS'],
        config: {
          rounds: null,
          rest: {
            auto: true,
            inner: 45000, // 45 second rest between sets
            outer: 120000, // 2 minute rest during transition to next movement
          },
        },
        // this is the important part
        movements: [
          {
            type: 'EXERCISE',
            id: 'exercise1',
            // array with 3 entries. config.length = sets
            config: [
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
            ],
          },
          {
            type: 'EXERCISE',
            id: 'exercise2',
            config: [
              {
                reps: 250,
                interval: null,
                weight: null,
              },
              {
                reps: 250,
                interval: null,
                weight: null,
              },
            ],
          },
        ],
      },
      workout2: {
        id: 'workout2',
        lastModified: 1234,
        name: 'murph',
        description: '',
        tags: ['tag1', 'tag4'],
        mode: ['CIRCUIT', 'TIMED'],
        config: {
          rounds: 4, // specified if circuit. Nothing like this for sets because that's handled by counting movement config length.
          rest: {
            auto: true,
            inner: 30000,
            outer: 30000,
          },
        },
        movements: [
          {
            type: 'EXERCISE',
            id: 'exercise1',
            config: [
              {
                reps: null,
                interval: 60000,
                weight: 25,
              },
              {
                reps: null,
                interval: 60000,
                weight: 25,
              },
              {
                reps: null,
                interval: 60000,
                weight: 25,
              },
              {
                reps: null,
                interval: 60000,
                weight: 25,
              },
            ],
          },
        ],
      },
      workout3: {
        id: 'workout3',
        lastModified: 1234,
        name: 'workout inception',
        description: '',
        tags: ['tag1'],
        mode: ['SETS', 'REPS'],
        config: {
          rounds: null, // specified if circuit. Nothing like this for sets because that's handled by counting movement config length.
          rest: {
            auto: false,
            inner: null,
            outer: null,
          },
        },
        movements: [
          {
            type: 'EXERCISE',
            id: 'exercise1',
            // array with 3 entries. config.length = sets
            config: [
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
            ],
          },
          {
            type: 'WORKOUT',
            id: 'workout1',
            config: [
              // different object shape because it's a workout
              {
                reps: 10,
                interval: null,
                weight: 40,
              },
            ],
          },
        ],
      },
    },
    allIds: ['workout1', 'workout2'],
  },
  exercises: {
    byId: {
      exercise1: {
        id: 'exercise1',
        lastModified: 1234,
        name: 'burpee',
        description: '',
        tags: ['tag1', 'tag2'],
      },
      exercise2: {
        id: 'exercise2',
        lastModified: 1234,
        name: 'jumping jacks',
        description: '',
        tags: ['tag1', 'tag4'],
      },
    },
    allIds: ['exercise1', 'exercise2'],
  },
  tags: {
    byId: {
      tag1: {
        id: 'tag1',
        lastModified: 1234,
        name: 'push',
        description: '',
      },
      tag2: {
        id: 'tag2',
        lastModified: 1234,
        name: 'pull',
        description: '',
      },
    },
    allIds: ['tag1', 'tag2', 'tag3', 'tag4'],
  },
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // add workout
    // remove workout
    // add exercise
    // remove exercise
    // Add tag
    // remove tag
    // reorder tags
  },
});

// interface ThemeMode {
//   themeMode: 'LIGHT' | 'DARK';
// }

// type ModalMode = 'ADD' | 'EDIT' | 'VIEW' | 'DELETE' | null;
// export type IsAddMoveMode = boolean;
// export type IsPointerDisabled = boolean;

// interface UIState {
//   theme: DefaultTheme;
//   modalMode: ModalMode;
//   isAddMoveMode: IsAddMoveMode;
//   isPointerDisabled: IsPointerDisabled;
// }

// const initialState: UIState = {
//   theme: darkTheme,
//   modalMode: null,
//   isAddMoveMode: false,
//   isPointerDisabled: false,
// };

// const dataSlice = createSlice({
//   name: 'ui',
//   initialState,
//   reducers: {
//     setTheme(state, action: PayloadAction<ThemeMode>) {
//       const { themeMode } = action.payload;
//       if (themeMode === 'LIGHT') {
//         state.theme = lightTheme;
//       } else if (themeMode === 'DARK') {
//         state.theme = darkTheme;
//       }
//     },

//     setModalMode(state, action: PayloadAction<ModalMode>) {
//       state.modalMode = action.payload;
//     },

//     setIsAddMoveMode(state, action: PayloadAction<IsAddMoveMode>) {
//       state.isAddMoveMode = action.payload;
//     },

//     setIsPointerDisabled(state, action: PayloadAction<IsPointerDisabled>) {
//       state.isPointerDisabled = action.payload;
//     },
//   },
// });

// export const {
//   // setTheme,
//   // setModalMode,
//   // setIsAddMoveMode,
//   // setIsPointerDisabled,
// } = dataSlice.actions;

export default dataSlice.reducer;
