import styled from 'styled-components';

export const ArchetypesFieldWrapper = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const ArchetypeListItemWrapper = styled.li<{
  isDisabled?: boolean;
  active?: boolean;
}>`
  display: grid;
  height: 2rem;
  align-items: center;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  pointer-events: ${(props) => (props.isDisabled ? 'none' : 'default')};
  background: ${({ theme }) => theme.mode.background[300]};
  border: 3px solid ${(props) => props.color};
  border-radius: 3px;
  cursor: pointer;
  p.name {
    padding: 0.25rem 0.5rem;
    color: default;
    font-size: 16px;
    line-height: 1.15;
  }
`;
