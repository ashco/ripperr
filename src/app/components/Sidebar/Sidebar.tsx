import styled from "styled-components";
import Link from 'next/link';

const Sidebar = () => (
  <SidebarWrapper>
    <LinksWrapper>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </LinksWrapper>
    <ProfileWrapper>
      Profile
    </ProfileWrapper>
  </SidebarWrapper>
);

const SidebarWrapper = styled.nav`
  display: grid;
  grid-template-rows: auto 80px;
  grid-area: sidebar;
  grid-template-areas:
    "links"
    "profile";
  padding: 1rem;
`;

const LinksWrapper = styled.div``;
const ProfileWrapper = styled.div`
  grid-area: profile;
`;


export default Sidebar;
