// https://www.styled-components.com/docs/api#typescript

// import original module declarations
import 'styled-components';

// This modifies the Styled Component theme object declaration
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      neutral: any;
      blue: any;
      green: any;
      yellow: any;
      red: any;
    };
    font: any;
    shadow: any;
    space: any;
    maxWidth: string;
    modalBackground: string;
  }
}
