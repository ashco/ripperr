import styled from 'styled-components';
import { sizes } from '@/styles/sizes';

const NavigationWrapper = styled.nav`
  /* background-color: ${({ theme }) => theme.color.neutral[100]}; */
  background-color: ${({ theme }) => theme.mode.background[300]};
  opacity: 0.85;
  box-shadow: ${(props) => props.theme.shadow[2]};
  grid-area: navigation;
  z-index: 99;
  ul {
    display: grid;
    grid-auto-flow: column;
    place-items: center;
    height: 100%;
    padding: 0 0.8rem;
    div.list-group {
      display: grid;
      grid-auto-flow: column;
      place-items: center;
      gap: 2rem;
      /* justify-content: space-between; */
    }
    div.left {
      place-self: center start;
    }
    div.right {
      place-self: center end;
    }
    .logo {
      font-size: 22px;
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 32px auto;
      align-items: center;
    }
    a {
      color: ${(props) => props.theme.mode.color[100]};
    }
  }

  @media (min-width: ${sizes.tablet}) {
    ul {
      padding: 0 2rem;
    }
  }
`;

export default NavigationWrapper;
