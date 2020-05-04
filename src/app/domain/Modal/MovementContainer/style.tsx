import styled from 'styled-components';

// import ModalWrapper from '../ModalWrapper';

import { MovementType } from '@/types/enums';
import { sizes } from '@/styles/sizes';

const StyledMovementContainer = styled.div<{
  type: MovementType;
}>`
  /* h1.title {
    font-size: 22px;
    font-weight: 600;
  } */
  width: ${(props) =>
    props.type === MovementType.Workout ? '40rem' : '32rem'};
  /* max-width: 95%; */

  /* @media (min-width: ${sizes.tablet}) {
    /* max-width: ${(props) =>
      props.type === MovementType.Workout ? '40rem' : '32rem'}; */

    /* h1.title {
      font-size: 24px;
    } */
  } */
`;

export default StyledMovementContainer;
