import { IMovements } from './types';

export function createMovementColList(colNum: number, moveList: IMovements[]) {
  // create sorted movement lists
  const movementColList: IMovements[][] = [];

  for (let i = 0; i < colNum; i += 1) {
    movementColList.push([]);
  }
  moveList.forEach((move, i) => {
    const index = i % colNum;
    movementColList[index].push(move);
  });

  return movementColList;
}
