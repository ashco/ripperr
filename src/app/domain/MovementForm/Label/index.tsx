import React from 'react';
import styled from 'styled-components';

import { sizes } from '@/styles/sizes';

const Label: React.FC<{ text: string; display: 'inline' | 'block' }> = ({
  text,
  display,
  children,
}) => {
  if (display === 'inline') {
    return <InlineLabel text={text}>{children}</InlineLabel>;
  } else {
    return <BlockLabel text={text}>{children}</BlockLabel>;
  }
};

const InlineLabel: React.FC<{ text: string }> = ({ text, children }) => (
  <InlineLabelWrapper>
    <LabelText>{text}</LabelText>
    {children}
  </InlineLabelWrapper>
);

const BlockLabel: React.FC<{ text: string }> = ({ text, children }) => (
  <BlockLabelWrapper>
    <LabelText>{text}</LabelText>
    {children}
  </BlockLabelWrapper>
);

const InlineLabelWrapper = styled.div`
  display: grid;
  grid-template-columns: 6rem auto;
  p {
    padding-top: 0.5rem;
  }

  @media (min-width: ${sizes.tablet}) {
    grid-template-columns: 8rem auto;
  }
`;

const BlockLabelWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  @media (min-width: ${sizes.tablet}) {
    gap: 1rem;
  }
`;

const LabelText = styled.p`
  font-size: 16px;

  @media (min-width: ${sizes.tablet}) {
    font-size: 20px;
  }
`;

export default Label;
