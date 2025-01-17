﻿import React from 'react';
import styled from 'styled-components';
import ColorBarWrapper from 'components/ColorBarWrapper';
import { sizes } from 'styles/sizes';

interface Props {
  onClick?: (e: any) => void;
  className?: string;
  color?: string;
  barHeight?: string;
  labelAccess?: string;
}

const ColorBarContainer: React.FC<Props> = ({
  className,
  color = 'green',
  barHeight,
  children,
  onClick,
  labelAccess,
}) => (
  <ColorBarWrapper
    className={className}
    color={color}
    barHeight={barHeight}
    onClick={onClick}
    labelAccess={labelAccess}
  >
    <Container className="container">{children}</Container>
  </ColorBarWrapper>
);

const Container = styled.div`
  display: grid;
  gap: 1.25rem;
  background: ${(p) => p.theme.mode.background[300]};
  box-shadow: ${(p) => p.theme.shadow[1]};
  padding: 1rem;
  p,
  a,
  h1 {
    color: ${(p) => p.theme.mode.color[100]};
  }
  h1 {
    font-size: 22px;
    font-weight: 600;
  }
  a {
    font-weight: 600;
  }
  a:hover {
    text-decoration-line: underline;
  }

  @media (min-width: ${sizes.tablet}) {
    padding: 2rem;
    h1 {
      font-size: 24px;
    }
  }
`;

export default ColorBarContainer;
