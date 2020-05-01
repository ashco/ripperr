import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../../context';

import { ArchFormListItem } from '../../ListItems';
import { Button } from '../../Buttons';

import { ModalMode } from '../../../types/enums';

const ArchField: React.FC<{
  tags: string[];
  disabled: boolean;
  modalMode: ModalMode;
}> = ({ tags, disabled, modalMode }) => {
  const { archetypes } = React.useContext(MovementListContext);

  return (
    <ArchFieldWrapper>
      {archetypes
        // TODO - make more performent
        .filter((arch) => {
          if (modalMode === ModalMode.View) {
            return tags.includes(arch.id as string);
          } else {
            return true;
          }
        })
        .map((arch) => (
          <ArchFormListItem
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
  flex-wrap: wrap;
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
