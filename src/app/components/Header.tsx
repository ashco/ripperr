import Router from "next/router";
// import NProgress from "nprogress";
import styled from "styled-components";

// import SearchButtonStyle from "./Buttons/SearchButton";
// import SearchIcon from "./Icons/SearchIcon";

// Handle loading progress bar
// Router.events.on("routeChangeStart", url => {
//   NProgress.start();
// });

// Router.events.on("routeChangeComplete", url => {
//   NProgress.done();
// });

// Router.events.on("routeChangeError", url => {
//   NProgress.done();
// });

const Header = () => (
  <HeaderWrapper>
    <TextContainer>
      <h1>Header</h1>
      <h2>Sub-header</h2>
    </TextContainer>
    {/* <SearchButtonStyle>
      <SearchIcon></SearchIcon>
    </SearchButtonStyle> */}
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  display: grid;
  grid-template-columns: auto 80px;
  grid-area: header;
`;

const TextContainer = styled.div`
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  h1 {
    font-size: 32px;
    color: #464646;
    font-weight: 700;
  }
  h2 {
    font-size: 16px;
    color: #686868;
  }
`;

export default Header;
