import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../../context';

import { ArchListItemForm } from '../../ListItems';
import { Button } from '../../Buttons';

const ArchField: React.FC<{
  tags: string[];
  disabled: boolean;
}> = ({ tags, disabled }) => {
  const { archetypes } = React.useContext(MovementListContext);

  return (
    <ArchFieldWrapper>
      {archetypes.map((arch) => (
        <ArchListItemForm
          key={arch.id}
          archetype={arch}
          active={tags.includes(arch.id as string)}
          disabled={disabled}
        />
      ))}
    </ArchFieldWrapper>
  );
};

const ArchFieldWrapper = styled.ul`
  display: flex;
  justify-content: flex-start;
`;

const ArchButton = styled(Button)<{ active: boolean }>`
  border-color: ${(props) =>
    props.active ? props.theme.color.orange[500] : 'white'};
  background-color: ${(props) =>
    props.active ? props.theme.color.orange[500] : 'default'};
  color: ${(props) => (props.active ? 'black' : 'default')};
  font-weight: ${(props) => (props.active ? '600' : 'default')};
`;

export default ArchField;
