import React from 'react';
import { ThemeContext } from 'styled-components';

import { MovementListContext, useMoveDispatch } from '@/context';

// import { ArchFormListItem } from '@/components/ListItems';
import { ArchetypesFieldWrapper, ArchetypeListItemWrapper } from './style';

import { ModalMode } from '@/types/enums';
import { Archetype } from '@/types/types';

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
          <ArchetypeListItem
            key={arch.id}
            archetype={arch}
            active={tags.includes(arch.id as string)}
            disabled={disabled}
          />
        ))}
    </ArchetypesFieldWrapper>
  );
};

const ArchetypeListItem: React.FC<{
  archetype: Archetype;
  active: boolean;
  disabled: boolean;
}> = ({ archetype, active, disabled }) => {
  const themeContext = React.useContext(ThemeContext);
  const moveDispatch = useMoveDispatch();

  function toggleArch() {
    moveDispatch({
      type: 'MOVE_CHANGE_ARCH',
      value: archetype.id,
    });
  }

  return (
    <ArchetypeListItemWrapper
      color={
        active
          ? themeContext.color.orange[500]
          : themeContext.mode.colorOpacity[200]
      }
      onClick={toggleArch}
      active={active}
      disabled={disabled}
    >
      <p className="name">{archetype.name}</p>
    </ArchetypeListItemWrapper>
  );
};

export default ArchetypesField;
