import styled from 'styled-components';

const TagListWrapper = styled.ul`
  margin: 0 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, 9rem);
  grid-auto-rows: 3rem;
  grid-auto-flow: row dense;
  justify-content: center;
`;

export default TagListWrapper;
