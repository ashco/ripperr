import React from 'react';
import styled from 'styled-components';

import { useModalState } from '@/context/ModalContext';

import { sizes } from '@/styles/sizes';
import { ModalMode } from '@/types/enums';

const Label: React.FC<{ text: string; display: 'inline' | 'block' }> = ({
  text,
  display,
  children,
}) => {
  const modalState = useModalState();
  const showLabel =
    modalState.mode === ModalMode.Add || modalState.mode === ModalMode.Edit;

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
    grid-template-columns: ${(props) =>
      props.showLabel ? '6rem auto' : 'auto'};
    p {
      padding-top: 0.75rem;
    }
  }
  &.block {
    grid-template-rows: ${(props) => (props.showLabel ? 'auto auto' : 'auto')};
    gap: 0.25rem;
    input,
    textarea {
      padding-left: 0px;
    }
  }

  @media (min-width: ${sizes.tablet}) {
    p {
      font-size: 18px;
    }
    &.inline {
      grid-template-columns: ${(props) =>
        props.showLabel ? '8rem auto' : 'auto'};
    }
    &.block {
      gap: 1rem;
    }
  }
`;

export default Label;
