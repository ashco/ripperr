import styled from 'styled-components';

import ModalWrapper from '../ModalWrapper';

import { MovementType } from '@/types/enums';
import { sizes } from '@/styles/sizes';

const MovementModalWrapper = styled(ModalWrapper)<{ type: MovementType }>`
  h1.title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }

  @media (min-width: ${sizes.tablet}) {
    max-width: ${(props) =>
      props.type === MovementType.Workout ? '40rem' : '32rem'};
  }
`;

export default MovementModalWrapper;
