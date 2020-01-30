import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthUserContext, FirebaseContext } from '../../context';

import { ListItem } from './index';
// import { ListItemWrapper } from './ListItem';
import { DeleteButton, MovementFormButton } from '../Buttons';

import { IArchetype } from '../../common/types';
import { FormMode } from '../../common/enums';

const ArchetypeListItem: React.FC<{ archetype: IArchetype }> = ({
  archetype,
}) => {
  const firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

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
    <ArchetypeListItemWrapper>
      <div className="color-bar" />
      <p className="name">{archetype.name}</p>
      <div className="btn-container">
        <span className="row">
          <DeleteButton text={deleteText} handleDelete={handleDelete} />
          <MovementFormButton formMode={FormMode.Edit} movement={archetype} />
        </span>
      </div>
    </ArchetypeListItemWrapper>
  );
};

const ArchetypeListItemWrapper = styled(ListItem)`
  /* height: ${(props) => props.theme.space[8]}; */
  .color-bar {
    background-color: ${(props) => props.theme.color.green[500]};
  }
`;

export default ArchetypeListItem;
