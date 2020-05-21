import styled from 'styled-components';

const MoveListWrapper = styled.div`
  padding: 1rem 1rem 0;
  overflow-y: auto;
  color: ${(props) => props.theme.mode.color[100]};
  display: grid;
  scrollbar-width: none;

  p.message {
    justify-self: center;
    align-self: center;
  }
  ul {
    padding-bottom: 1rem;
    display: grid;
    justify-content: center;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 9rem);
    grid-auto-rows: 6rem;
    grid-auto-flow: row dense;
    &:after {
      content: ' ';
      height: 1px;
      position: relative;
      bottom: 0;
    }
  }
`;

export default MoveListWrapper;
