import styled from 'styled-components';

export const TagsFieldWrapper = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const TagListItemWrapper = styled.li<{
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

// export const TagListItemWrapper = styled.label<{ active?: boolean }>`
//   input {
//     /* display: none; */
//   }
//   span {
//     height: 2rem;
//     margin: 0 0.25rem 0.25rem 0;
//     border: 3px solid
//       ${(props) =>
//         props.active
//           ? props.theme.color.orange[500]
//           : props.theme.mode.colorOpacity[200]};
//     border-radius: 3px;
//     cursor: pointer;
//     padding: 0.25rem 0.5rem;
//     font-size: 16px;
//     line-height: 1.15;
//   }
// `;
