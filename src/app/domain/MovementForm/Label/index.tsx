import React from 'react';
import { useSelector, useDispatch } from 'store';
import styled from 'styled-components';

import { sizes } from 'styles/sizes';

const Label: React.FC<{
  text: string;
  display: 'inline' | 'block' | 'none';
}> = ({ text, display, children }) => {
  const { modalMode } = useSelector((state) => state.modal);
  const showLabel = modalMode === 'MODAL_EDIT';

  return (
    <LabelWrapper className={display} showLabel={showLabel}>
      {showLabel && <p>{text}</p>}
      {children}
    </LabelWrapper>
  );
};

const LabelWrapper = styled.div<{ showLabel: boolean }>`
  display: grid;
  p {
    font-size: 16px;
  }
  &.inline {
    grid-template-columns: ${(p) => (p.showLabel ? '6rem auto' : 'auto')};
    p {
      padding-top: 0.75rem;
    }
  }
  &.block {
    grid-template-rows: ${(p) => (p.showLabel ? 'auto auto' : 'auto')};
    gap: 0.25rem;
    input,
    textarea {
      padding-left: 0px;
    }
  }
  &.none {
    display: none;
  }

  @media (min-width: ${sizes.tablet}) {
    p {
      font-size: 18px;
    }
    &.inline {
      grid-template-columns: ${(p) => (p.showLabel ? '8rem auto' : 'auto')};
    }
    &.block {
      gap: 1rem;
    }
  }
`;

export default Label;
