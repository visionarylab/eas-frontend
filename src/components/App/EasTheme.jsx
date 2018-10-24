import { createMuiTheme } from '@material-ui/core/styles';

// Example of theme creation
// https://github.com/mui-org/material-ui/issues/1915#issuecomment-310849153
// Default theme: https://material-ui.com/customization/default-theme/

const fontFamilySecondary =
  '"Fredoka One", -apple-system, BlinkMacSystemFont, "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica", "Arial", sans-serif';

const fontFamilyPrimary =
  '"Montserrat", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica", "Arial", sans-serif';

const primaryColor = '#4caf50';
const secondaryColor = '#f44336';

const fontHeader = {
  color: primaryColor,
  fontFamily: fontFamilySecondary,
};

const baseTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: fontFamilyPrimary,
  },
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#f44336',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        'text-transform': 'inherit',
      },
    },
  },
});

const theme = {
  ...baseTheme,
  typography: {
    ...baseTheme.typography,
    h1: {
      ...baseTheme.typography.h1,
      ...fontHeader,
      fontSize: '2.125rem',
      lineHeight: '2.5rem',
    },
    h2: {
      ...baseTheme.typography.h2,
      ...fontHeader,
      fontSize: '1.625rem',
      lineHeight: '1.875rem',
    },

    h3: {
      ...baseTheme.typography.h3,
      ...fontHeader,
      fontSize: '1.125rem',
      lineHeight: '1.3125rem',
    },
    h4: {
      ...baseTheme.typography.h4,
      ...fontHeader,
    },
    subtitle1: {
      ...baseTheme.typography.subtitle1,
      color: baseTheme.palette.text.secondary,
      fontSize: '.875rem',
    },
    body2: {
      ...baseTheme.typography.body2,
      lineHeight: '1.5rem',
    },
  },
};
export default theme;
