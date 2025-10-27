import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      text: string;
      background: string;
      primary: string;
      secondary: string;
      accent: string;
      shadow: string;
      border: string;
      error: string;
      success: string;
    };
  }
}
