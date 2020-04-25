import React from 'react';
import styled from 'styled-components';

const ToolTip: React.FC<{ text: string; hidden: boolean }> = ({
  text,
  hidden,
  children,
}) => {
  return (
    <ToolTipWrapper hidden={hidden}>
      {children}
      <span className="tool-tip-text">{text}</span>
    </ToolTipWrapper>
  );
};

const ToolTipWrapper = styled.div<{ hidden: boolean }>`
  position: relative;
  display: inline-block;
  .tool-tip-text {
    visibility: hidden;
    position: absolute;
    width: auto;
    max-width: 12rem;
    background-color: ${(props) => props.theme.mode.background[300]};
    color: white;
    text-align: center;
    padding: 0.25rem 0.5rem;
    margin: 0.25rem 0.5rem;

    border-radius: 0.25rem;
    border: 0.25rem;
    z-index: 15;

    bottom: 100%;
  }
  &:hover .tool-tip-text {
    visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  }
`;

export default ToolTip;
