import styled from 'styled-components';

// import ModalWrapper from '../ModalWrapper';

import { MovementType } from '@/types/enums';
import { sizes } from '@/styles/sizes';

const StyledMovementContainer = styled.div<{
  type: MovementType;
}>``;
// max-width: ${(props) =>
//   props.type === MovementType.Workout ? '40rem' : '32rem'};

export default StyledMovementContainer;
