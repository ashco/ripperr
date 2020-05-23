import { MovementType } from 'types';
import assertNever from 'utils/assert-never';

// Determine ColorBar color
function getColor(type: MovementType): string {
  switch (type) {
    case 'WORKOUT':
      return 'blue';
    case 'EXERCISE':
      return 'purple';
    case 'TAG':
      return 'orange';
    default:
      return assertNever(type);
  }
}

export default getColor;
