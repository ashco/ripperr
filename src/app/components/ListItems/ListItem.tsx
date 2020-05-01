import React from 'react';
import styled from 'styled-components';

export const ListItem = styled.li<{ color?: string }>`
  background: ${({ theme }) => theme.mode.background[300]};
  box-shadow: ${(props) => props.theme.shadow[1]};
  /* border-radius: 3px; */
  display: grid;
  grid-template-columns: 1fr auto;
  /* border-top: 7px solid ${(props) => props.color}; */
  cursor: pointer;
  p {
    font-size: 16px;
    padding: 0.75rem 0.5rem;
    color: ${(props) => props.theme.mode.color[100]};
    font-weight: 600;
    line-height: 1.15;
  }
  .row {
    display: flex;
  }
  .list-item-menu-container {
    display: grid;
  }
  .btn-wrapper {
    align-self: end;
  }
  .btn-container {
    button {
      border: none;
    }
  }
`;

export default ListItem;
