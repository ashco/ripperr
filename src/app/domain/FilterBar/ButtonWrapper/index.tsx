import styled from 'styled-components';

import Button from 'components/Button';

const ButtonWrapper = styled(Button)`
  display: grid;
  place-items: center;
  background-color: ${(props) => props.theme.mode.background[300]};
  box-shadow: ${(props) => props.theme.shadow[2]};
  border: none;
  &:hover {
    color: ${(props) => props.theme.mode.color[200]};
  }
`;

export default ButtonWrapper;
