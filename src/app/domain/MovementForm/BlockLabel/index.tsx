import React from 'react';
import styled from 'styled-components';

const BlockLabel: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <BlockLabelWrapper>
      <p>{name}</p>
      {children}
    </BlockLabelWrapper>
  );
};

const BlockLabelWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 1rem;
  p {
    font-size: 20px;
  }
`;

export default BlockLabel;
