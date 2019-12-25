import styled from 'styled-components';
import Link from 'next/link';

import SignOutButton from './SignOutButton';

const Navigation = () => (
  <NavigationWrapper>
    <LinksWrapper>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </LinksWrapper>
    <ProfileWrapper>
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
      <Link href="/signin">
        <a>Sign In</a>
      </Link>
      <SignOutButton />
    </ProfileWrapper>
  </NavigationWrapper>
);

const NavigationWrapper = styled.nav`
  display: grid;
  grid-template-rows: auto 80px;
  grid-area: sidebar;
  grid-template-areas:
    'links'
    'profile';
  padding: 1rem;
`;

const LinksWrapper = styled.div``;
const ProfileWrapper = styled.div`
  grid-area: profile;
`;

export default Navigation;
