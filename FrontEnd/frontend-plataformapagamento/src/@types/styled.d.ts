//Nome styled.d.ts significa que vai ter apenas código exclusivamente typescript.
//Arquivo de definição de tipos

import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type ThemeType = typeof defaultTheme;

declare module "styled-components"{
    export interface DefaultTheme extends ThemeType{}
}