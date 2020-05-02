import styled from 'styled-components';

import ModalWrapper from '../ModalWrapper';

import { MovementType } from '@/types/enums';

const MovementModalWrapper = styled(ModalWrapper)<{ type: MovementType }>`
  max-width: ${(props) =>
    props.type === MovementType.Workout ? '40rem' : '32rem'};
  h1.title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
`;

export default MovementModalWrapper;
