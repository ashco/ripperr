import { IMovements } from '../common/types';

export function sortMovements(a: IMovements, b: IMovements): number {
  if (a.lastModified !== null && b.lastModified !== null) {
    const aTime = (a.lastModified as firebase.firestore.Timestamp)
      .toDate()
      .getTime();
    const bTime = (b.lastModified as firebase.firestore.Timestamp)
      .toDate()
      .getTime();

    return bTime - aTime;
  } else {
    return 0;
  }
}
