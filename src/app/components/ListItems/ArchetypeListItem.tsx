﻿import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
// import { ListItemWrapper } from './ListItem';
import {
  DeleteButton,
  MovementFormButton,
  ListItemMenuButton,
} from '../Buttons';

import { IArchetype } from '../../common/types';
import { FormMode } from '../../common/enums';

const ArchetypeListItem: React.FC<{ archetype: IArchetype }> = ({
  archetype,
}) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const themeContext = useContext(ThemeContext);

  const deleteText = `Do you want to delete this archetype: ${archetype.name}?`;

  function handleDelete(): void {
    if (authUser) {
      firebase
        .archetype(authUser.uid, archetype.id)
        .delete()
        .then(() => console.log(`Archetype Deleted: ${archetype.name}`))
        .catch((err) => console.error(err));
    }
  }

  return (
    <ArchetypeListItemWrapper color={themeContext.color.green[500]}>
      <p className="name">{archetype.name}</p>
      {/* <div className="btn-container">
        <span className="row">
          <DeleteButton text={deleteText} handleDelete={handleDelete} />
          <MovementFormButton formMode={FormMode.Edit} movement={archetype} />
        </span>
      </div> */}
      {/* <ListItemMenuButton /> */}
    </ArchetypeListItemWrapper>
  );
};

const ArchetypeListItemWrapper = styled(ListItem)`
  height: 100%;
  .name {
    padding: 0.5rem;
  }
`;

export default ArchetypeListItem;
