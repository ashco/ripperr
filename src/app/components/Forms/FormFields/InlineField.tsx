import React from 'react';
import styled from 'styled-components';

const InlineField: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <InlineFieldWrapper>
      <p>{name}</p>
      {children}
    </InlineFieldWrapper>
  );
};

const InlineFieldWrapper = styled.div`
  display: grid;
  grid-template-columns: 8rem auto;
  p {
    font-size: 20px;
    align-self: center;
  }
`;

export default InlineField;
