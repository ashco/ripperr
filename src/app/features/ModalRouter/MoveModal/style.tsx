import styled from 'styled-components';

import Container from 'components/Container';

const MoveModalContainer = styled(Container)<{ width: string }>`
  width: ${(p) => p.width};
`;

export default MoveModalContainer;
