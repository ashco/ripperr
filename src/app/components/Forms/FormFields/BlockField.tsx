import React from 'react';
import styled from 'styled-components';

const BlockField: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <BlockFieldWrapper>
      <p>{name}</p>
      {children}
    </BlockFieldWrapper>
  );
};

const BlockFieldWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 1rem;
  p {
    font-size: 20px;
    /* align-self: center; */
    /* padding-top: 0.5rem; */
  }
`;

export default BlockField;
