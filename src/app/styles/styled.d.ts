// https://www.styled-components.com/docs/api#typescript

// import original module declarations
import 'styled-components';

// This modifies the Styled Component theme object declaration
declare module 'styled-components' {
  export interface DefaultTheme {
    // borderRadius: string

    colors: {
      black: string;
      grey: string;
      red: string;
      // main: string
      // secondary: string
    };
    boxShadow: string;
    maxWidth: string;
  }
}
