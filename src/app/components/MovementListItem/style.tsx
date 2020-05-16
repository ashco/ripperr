import styled from 'styled-components';

const MenuListItemWrapper = styled.div`
  > div {
    height: 100%;
    .menu-list-item-container {
      background: ${({ theme }) => theme.mode.background[300]};
      box-shadow: ${(props) => props.theme.shadow[1]};
      display: grid;
      grid-template-columns: 1fr auto;
      cursor: pointer;
      .left {
        p.name {
          font-size: 16px;
          padding: 0.75rem 0.5rem;
          color: ${(props) => props.theme.mode.color[100]};
          font-weight: 600;
          line-height: 1.15;
        }
      }
      .right {
        display: grid;
        .option-menu-btn-wrapper {
          align-self: end;
        }
      }
    }
  }
`;

export const WorkoutWrapper = styled(MenuListItemWrapper)`
  grid-area: auto / auto / span 2 / span 2;
`;

export const ExerciseWrapper = styled(MenuListItemWrapper)``;

export const ArchetypeWrapper = styled(MenuListItemWrapper)``;
