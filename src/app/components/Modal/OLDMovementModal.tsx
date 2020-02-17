// import React, { useState } from 'react';
// import styled from 'styled-components';

// import { ModalWrapper } from './index';
// import { MovementForm, AddForm } from '../Forms';

// import { FormMode, MovementType } from '../../common/enums';
// import { IMovements } from '../../common/types';

// const MovementModal: React.FC<{
//   formMode: FormMode;
//   movement?: IMovements;
//   hide: () => void;
// }> = ({ formMode, hide, movement }) => {
//   // Determine type to add
//   const [addMovementType, setAddMovementType] = useState<MovementType | null>(
//     null,
//   );
//   const addArchetype = () => setAddMovementType(MovementType.Archetype);
//   const addExercise = () => setAddMovementType(MovementType.Exercise);
//   const addWorkout = () => setAddMovementType(MovementType.Workout);

//   function renderForm() {
//     if (addMovementType) {
//       return (
//         <MovementForm
//           movementType={addMovementType}
//           formMode={formMode}
//           movement={movement}
//           hide={hide}
//         />
//       );
//     } else if (movement) {
//       return (
//         <MovementForm
//           movementType={movement.type}
//           formMode={formMode}
//           movement={movement}
//           hide={hide}
//         />
//       );
//     } else if (addMovementType === null) {
//       return (
//         <AddForm
//           addArchetype={addArchetype}
//           addExercise={addExercise}
//           addWorkout={addWorkout}
//           hide={hide}
//         />
//       );
//     }
//   }

//   return <MovementModalWrapper>{renderForm()}</MovementModalWrapper>;
// };

// const MovementModalWrapper = styled(ModalWrapper)`
//   /* padding: 3rem 2rem; */
// `;

// export default MovementModal;
