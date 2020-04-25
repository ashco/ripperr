import { Movement } from '../types/types';

export function createMovementColList(colNum: number, moveList: Movement[]) {
  // create sorted movement lists
  const movementColList: Movement[][] = [];

  for (let i = 0; i < colNum; i += 1) {
    movementColList.push([]);
  }
  moveList.forEach((move, i) => {
    const index = i % colNum;
    movementColList[index].push(move);
  });

  return movementColList;
}
