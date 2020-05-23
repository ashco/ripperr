import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'store';
import { setTheme } from 'store/ui';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';

import Meta from 'components/Meta';
import NavBar from 'features/Navigation';

import StyledPage from './style';

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
      <StyledPage isPointerDisabled={isPointerDisabled}>
        <GlobalStyle />
        <Meta />
        <NavBar />
        <main>{props.children}</main>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
