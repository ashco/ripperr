import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '@/context';

import { ArchFormListItem } from '@/components/ListItems';

import { ModalMode } from '@/types/enums';

const ArchetypesField: React.FC<{
  tags: string[];
  disabled: boolean;
  modalMode: ModalMode;
}> = ({ tags, disabled, modalMode }) => {
  const { archetypes } = React.useContext(MovementListContext);

  return (
    <ArchetypesFieldWrapper>
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
    </ArchetypesFieldWrapper>
  );
};

const ArchetypesFieldWrapper = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export default ArchetypesField;
