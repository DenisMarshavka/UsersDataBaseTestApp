import 'styled-components';
import AppColors from './theme/appColors';
import AppSizes from './theme/appSizes';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [K in theme.colors]: AppColors[K];
    };
    offsets: {
      [K in theme.offsets]: AppSizes[K];
    };
  }
}
