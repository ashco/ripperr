﻿const arrayMoveMutate = (array: any[], from: number, to: number) => {
  const startIndex = to < 0 ? array.length + to : to;
  const item = array.splice(from, 1)[0];
  array.splice(startIndex, 0, item);
};

const arrayMove = (array: any[], from: number, to: number) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};

export default arrayMove;
