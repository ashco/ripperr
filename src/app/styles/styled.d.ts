// https://www.styled-components.com/docs/api#typescript

// import original module declarations
import 'styled-components';

// This modifies the Styled Component theme object declaration
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      neutral: any;
      blue: object;
      green: object;
      yellow: object;
      red: object;
    };
    font: object;
    shadow: object;
    space: object;
    maxWidth: string;
  }
}
