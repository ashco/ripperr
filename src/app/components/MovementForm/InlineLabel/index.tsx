import React from 'react';
import styled from 'styled-components';

const InlineLabel: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <InlineLabelWrapper>
      <p>{name}</p>
      {children}
    </InlineLabelWrapper>
  );
};

const InlineLabelWrapper = styled.div`
  display: grid;
  grid-template-columns: 8rem auto;
  p {
    font-size: 20px;
    padding-top: 0.5rem;
  }
`;

export default InlineLabel;
