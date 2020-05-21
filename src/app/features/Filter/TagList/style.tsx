import styled from 'styled-components';

const TagListWrapper = styled.div`
  p.message {
    color: ${(p) => p.theme.mode.color[200]};
    text-align: center;
  }
  ul {
    margin: 0 1rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, 9rem);
    grid-auto-rows: 3rem;
    grid-auto-flow: row dense;
    justify-content: center;
  }
`;

export default TagListWrapper;
