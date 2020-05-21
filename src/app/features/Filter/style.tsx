import styled from 'styled-components';

const FilterContainer = styled.div<{ active: boolean }>`
  padding: 0.75rem;
  display: grid;
  gap: 1rem;
  border-top: solid
    ${(props) =>
      props.active
        ? props.theme.color.orange[500] + '5px'
        : props.theme.mode.colorOpacity[200] + '2px'};
  background-color: ${(props) => props.theme.mode.background[200]};
`;

export default FilterContainer;
