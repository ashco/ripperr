import { Movement, Tag } from 'types';

// sort by newest modified first
export function sortMovements(a: Movement, b: Movement): number {
  // if (a.lastModified !== null && b.lastModified !== null) {
  //   const aTime = (a.lastModified as firebase.firestore.Timestamp)
  //     .toDate()
  //     .getTime();
  //   const bTime = (b.lastModified as firebase.firestore.Timestamp)
  //     .toDate()
  //     .getTime();

  //   return bTime - aTime;
  // } else {
  //   return 0;
  // }
  return 0;
}

// sort alphabetically
export function sortTags(a: Tag, b: Tag): number {
  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  } else {
    return 0;
  }
}
