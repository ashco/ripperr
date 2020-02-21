import React from 'react';
import styled from 'styled-components';

import { MovementListContext } from '../../context';

import {
  ArchetypeListItem,
  ExerciseListItem,
  WorkoutListItem,
} from '../ListItems';

import { sortMovements } from '../../common/sortMovements';
import { createMovementColList } from '../../common/createMovementColList';

import {
  Movement,
  Archetype,
  Exercise,
  Workout,
  IMovementState,
} from '../../common/types';
import { MovementType } from '../../common/enums';

export const ArchetypeList: React.FC<{
  archetypeList: Archetype[] | null;
  activeArchs: string[];
  setActiveArchs: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ archetypeList, activeArchs, setActiveArchs }) => {
  return (
    <ArchetypeListWrapper>
      {archetypeList ? (
        archetypeList.length === 0 ? (
          <div>No archetypes yet!</div>
        ) : (
          archetypeList.map((arch) => {
            const isActive = activeArchs.includes(arch.name);
            return (
              <ArchetypeListItem
                key={arch.id}
                archetype={arch}
                setActiveArchs={setActiveArchs}
                className={isActive ? 'active' : ''}
              />
            );
          })
        )
      ) : (
        <div>Loading ...</div>
      )}
    </ArchetypeListWrapper>
  );
};

const ArchetypeListWrapper = styled.ul`
  margin: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, 4rem);
  grid-auto-rows: 4rem;
  grid-auto-flow: row dense;
  /* grid-template-columns: repeat(auto-fit, 8rem); */
  /* grid-template-rows: repeat(auto-fill, 8rem); */
  justify-content: center;
  /* grid-template-columns: repeat(auto-fill, 8rem);
  grid-template-rows: repeat(auto-fill, 8rem); */
`;
