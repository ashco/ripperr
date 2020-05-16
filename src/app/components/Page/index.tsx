import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'store';
import { ThemeProvider } from 'styled-components';
import { setTheme } from 'store/ui';
import GlobalStyle from 'styles/GlobalStyle';

import StyledPage from './style';

// import { MoveProvider } from 'context/MoveContext';

import Meta from '../Meta';
import NavBar from 'features/Navigation';

const Page: React.FC = (props) => {
  const dispatch = useDispatch();
  const { theme, isPointerDisabled } = useSelector((state) => state.ui);

  useEffect(() => {
    const prevThemeMode = localStorage.getItem('theme');

    if (prevThemeMode) {
      dispatch({ type: prevThemeMode });
    } else if (
      typeof window !== `undefined` &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      dispatch(setTheme({ themeMode: 'DARK' }));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <MoveProvider> */}
      <StyledPage isPointerDisabled={isPointerDisabled}>
        <GlobalStyle />
        <Meta />
        <NavBar />
        <div className="main">{props.children}</div>
      </StyledPage>
      {/* </MoveProvider> */}
    </ThemeProvider>
  );
};

export default Page;
