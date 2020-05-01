import React, { useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

import { ListItemMenuButton } from '../Buttons';
import ColorBarWrapper from '../Containers/ColorBarWrapper';
import ToolTip from '../../utils/Tooltip';

import { ListItem } from './index';

import { useFilterState, useFilterDispatch } from '../../context/FilterContext';

import { Archetype } from '../../types/types';

const ArchetypeListItem: React.FC<{
  archetype: Archetype;
}> = ({ archetype }) => {
  const themeContext = useContext(ThemeContext);
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();

  const btnRef = useRef<HTMLDivElement>(null);

  function toggleActive(e: any) {
    if (!btnRef?.current?.contains(e.target)) {
      filterDispatch({ type: 'FILTER_TOGGLE_ARCH', value: archetype.id });
    }
  }

  function stringShortener(str: string, length: number): string {
    let shortStr = str.substring(0, length).trimEnd();

    if (str !== shortStr) {
      shortStr += '..';
    }
    return shortStr;
  }

  const active = filterState.archs.includes(archetype.id as string);

  const textLength = 10;
  const color = active
    ? themeContext.color.orange[500]
    : themeContext.mode.background[400];

  return (
    <ToolTip
      text={archetype.name}
      hidden={archetype.name.length < textLength}
      color={color}
    >
      <ColorBarWrapper color={color} type="thin">
        <ArchetypeListItemWrapper color={color} onClick={toggleActive}>
          <p className="name">{stringShortener(archetype.name, textLength)}</p>
          <div className="btn-wrapper">
            <div ref={btnRef}>
              <ListItemMenuButton movement={archetype} />
            </div>
          </div>
        </ArchetypeListItemWrapper>
      </ColorBarWrapper>
    </ToolTip>
  );
};

const TextExpander: React.FC<{
  text: string;
  length: number;
}> = ({ text, length }) => {
  // const ref = React.useRef<HTMLParagraphElement>(null);

  const [displayText, setDisplayText] = React.useState(text);

  function stringShortener(str: string, length: number): string {
    let shortStr = str.substring(0, length).trimEnd();

    if (str !== shortStr) {
      shortStr += '..';
    }
    return shortStr;
  }

  function handleMouseEnter() {
    setDisplayText(text);
  }

  function handleMouseLeave() {
    setDisplayText(stringShortener(text, 10));
  }
  // React.useEffect(() => {
  //   ref?.current?.addEventListener('hover', () => {
  //     console.log('hi mom!');
  //   });
  // });

  return (
    <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {displayText}
    </p>
  );
};

const ArchetypeListItemWrapper = styled(ListItem)`
  height: 100%;
  align-items: center;
  p {
    padding: 0.5rem;
  }
`;

export default ArchetypeListItem;
