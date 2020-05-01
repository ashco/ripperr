// https://www.styled-components.com/docs/api#typescript

// import original module declarations
import 'styled-components';

// This modifies the Styled Component theme object declaration
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: {
      type: string;
      background: any;
      backgroundOpacity: any;
      color: any;
      colorOpacity: any;
    };
    color: {
      logo: any;
      neutral: any;
      purple: any;
      blue: any;
      green: any;
      yellow: any;
      orange: any;
      red: any;
    };
    font: any;
    shadow: any;
    space: any;
    maxWidth: string;
    // modalBackground: string;
  }
}
