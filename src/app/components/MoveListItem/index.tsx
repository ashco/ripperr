import React from 'react';
import { useSelector, useDispatch, batch } from 'store';
import { setModalMode, setIsAddMoveMode } from 'store/ui';
import { setActiveMove, MovesState } from 'store/moves';
import { toggleFilterTag, FilterState } from 'store/filter';

// import ColorBarWrapper from 'components/ColorBarWrapper';
import OptionMenuButton from 'components/MoveListItem/OptionMenuButton';

import MoveListItemContainer from './style';
import { lookupMove } from 'utils/lookup-move';

const MoveListItem: React.FC<{
  filter?: FilterState;
  id: string;
  isAddMoveMode: boolean;
  moves: MovesState;
}> = ({ filter, id, isAddMoveMode, moves }) => {
  const dispatch = useDispatch();

  const move = lookupMove(moves, id);
  if (!move) throw Error('No move found!');
  const { data, type } = move;

  const btnRef = React.useRef<HTMLDivElement>(null);

  // Determine ColorBar color
  function getColor(): string {
    let color = '';
    switch (type) {
      case 'TAG': {
        // Make more efficient by lifting up. Do not loop through array for each component.
        const active = filter?.tags.includes(data.id as string);
        color = active ? 'orange' : 'neutral';
        break;
      }
      case 'EXERCISE':
        color = 'purple';
        break;
      case 'WORKOUT':
        color = 'blue';
        break;
      default:
        break;
    }
    return color;
  }

  function showModalView(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      batch(() => {
        dispatch(setModalMode({ modalMode: 'VIEW' }));
        dispatch(setActiveMove(id));
      });
      // moveDispatch({ type: 'MOVE_SET', value: move });
    }
  }

  function addMoveToWorkout(e: any): void {
    if (!btnRef?.current?.contains(e.target)) {
      batch(() => {
        console.log('Adding movement to workout');
        // moveDispatch({ type: 'MOVE_ADD_MOVE', value: move });
        dispatch(setModalMode({ modalMode: 'VIEW' }));
        dispatch(setIsAddMoveMode(false));
      });
    }
  }

  function toggleActiveArch(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      dispatch(toggleFilterTag(data.id));
    }
  }

  function handleClick(e: any) {
    console.log(e);

    if (type === 'WORKOUT' || type === 'EXERCISE') {
      if (isAddMoveMode) {
        addMoveToWorkout(e);
      } else {
        showModalView(e);
      }
    } else if (type === 'TAG') {
      toggleActiveArch(e);
    }
  }

  function stringShortener(str: string, length: number): string {
    let shortStr = str.substring(0, length).trimEnd();

    if (str !== shortStr) {
      shortStr += '..';
    }
    return shortStr;
  }

  // const nameLength = type === 'tag' ? 10 : Infinity;
  const nameLength = 12;
  const color = getColor();

  // const listItem = (
  //   <Container color={color} onClick={handleClick}>
  //     {/* <ColorBarWrapper color={color} height="5px"> */}

  //     {/* <div className="menu-list-item-container" onClick={handleClick}> */}
  //     <div className="left">
  //       <p className="name">{stringShortener(data.name, nameLength)}</p>
  //     </div>
  //     <div className="right">
  //       {!isAddMoveMode && (
  //         <div ref={btnRef} className="option-menu-btn-wrapper">
  //           <OptionMenuButton id={id} type={type} />
  //         </div>
  //       )}
  //     </div>
  //     {/* </div> */}
  //     {/* </ColorBarWrapper> */}
  //   </Container>
  // );

  // if (type === 'WORKOUT') {
  //   return <WorkoutWrapper>{listItem}</WorkoutWrapper>;
  // } else if (type === 'EXERCISE') {
  //   return <ExerciseWrapper>{listItem}</ExerciseWrapper>;
  // } else if (type === 'TAG') {
  //   return <TagWrapper>{listItem}</TagWrapper>;
  // } else {
  //   return null;
  // }
  return (
    <MoveListItemContainer
      color={color}
      barHeight="5px"
      onClick={handleClick}
      type={type}
    >
      <div className="left">
        <p className="name">{stringShortener(data.name, nameLength)}</p>
      </div>
      <div className="right">
        {!isAddMoveMode && (
          <div ref={btnRef} className="option-menu-btn-wrapper">
            <OptionMenuButton data={data} type={type} />
          </div>
        )}
      </div>
    </MoveListItemContainer>
  );
};

export default MoveListItem;
// const MoveListItem: React.FC<{ movement: Movement }> = ({ movement }) => {
//   const filter = useSelector((state) => state.filter);
//   const { isAddMoveMode } = useSelector((state) => state.ui);
//   const dispatch = useDispatch();

//   // const modalDispatch = useModalDispatch();
//   const moveDispatch = useMoveDispatch();

//   const btnRef = React.useRef<HTMLDivElement>(null);

//   movement;
//   // Determine ColorBar color
//   let color;
//   switch (movement.type) {
//     case MovementType.Tag: {
//       // TODO
//       // Make more efficient by lifting up. Do not loop through array for each component.
//       const active = filter.tags.includes(movement.id as string);
//       color = active ? 'orange' : 'neutral';
//       break;
//     }
//     case MovementType.Exercise:
//       color = 'purple';
//       break;
//     case MovementType.Workout:
//       color = 'blue';
//       break;
//     default:
//       break;
//   }

//   function toggleActiveArch(e: any) {
//     if (!btnRef?.current?.contains(e.target)) {
//       dispatch({ type: 'FILTER_TOGGLE_TAG', payload: movement.id });
//     }
//   }

//   function showModalView(e: any): void {
//     if (!btnRef?.current?.contains(e.target)) {
//       dispatch(setModalMode('VIEW'));
//       moveDispatch({ type: 'MOVE_SET', value: movement });
//     }
//   }

//   function addMoveToWorkout(e: any): void {
//     if (!btnRef?.current?.contains(e.target)) {
//       console.log('Adding movement to workout');
//       moveDispatch({ type: 'MOVE_ADD_MOVE', value: movement });
//       dispatch(setModalMode('EDIT'));
//       dispatch(setIsAddMoveMode(false));
//     }
//   }

//   function handleClick(e: any) {
//     if (movement.type === MovementType.Tag) {
//       toggleActiveArch(e);
//     } else {
//       if (isAddMoveMode) {
//         addMoveToWorkout(e);
//       } else {
//         showModalView(e);
//       }
//     }
//   }

//   function stringShortener(str: string, length: number): string {
//     let shortStr = str.substring(0, length).trimEnd();

//     if (str !== shortStr) {
//       shortStr += '..';
//     }
//     return shortStr;
//   }

//   const nameLength = movement.type === MovementType.Tag ? 10 : Infinity;

//   const listItem = (
//     <ColorBarWrapper color={color} height="5px">
//       <div className="menu-list-item-container" onClick={handleClick}>
//         <div className="left">
//           <p className="name">{stringShortener(movement.name, nameLength)}</p>
//         </div>
//         <div className="right">
//           {!isAddMoveMode && (
//             <div ref={btnRef} className="option-menu-btn-wrapper">
//               <OptionMenuButton movement={movement} />
//             </div>
//           )}
//         </div>
//       </div>
//     </ColorBarWrapper>
//   );

//   if (movement.type === MovementType.Workout) {
//     return <WorkoutWrapper>{listItem}</WorkoutWrapper>;
//   } else if (movement.type === MovementType.Exercise) {
//     return <ExerciseWrapper>{listItem}</ExerciseWrapper>;
//   } else if (movement.type === MovementType.Tag) {
//     return <TagWrapper>{listItem}</TagWrapper>;
//   } else {
//     return null;
//   }
// };

// export default MoveListItem;
