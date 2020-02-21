import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ListItemMenuButton } from '../Buttons';

import { ListItem } from './index';

import { Archetype } from '../../common/types';

const ArchetypeListItem: React.FC<{
  archetype: Archetype;
  setActiveArchs: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}> = ({ archetype, setActiveArchs, className }) => {
  const themeContext = useContext(ThemeContext);

  const btnRef = useRef<HTMLDivElement>(null);

  function toggleActive(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      setActiveArchs((prevState) => {
        const { name } = archetype;

        const index = prevState.indexOf(name);
        if (index > -1) {
          prevState.splice(index, 1);
        } else {
          prevState.push(name);
        }
        return [...prevState];
      });
    }
  }

  return (
    <ArchetypeListItemWrapper
      className={className}
      color={themeContext.color.green[500]}
      onClick={toggleActive}
    >
      <p className="name">{archetype.name}</p>
      <div className="list-item-menu-container">
        <div ref={btnRef}>
          <ListItemMenuButton movement={archetype} />
        </div>
      </div>
    </ArchetypeListItemWrapper>
  );
};

const ArchetypeListItemWrapper = styled(ListItem)`
  background: ${(props) =>
    props.className === 'active' && props.theme.color.green[500]};
  height: 100%;
  .name {
    padding: 0.5rem;
  }
`;

export default ArchetypeListItem;
