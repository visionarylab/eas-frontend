import { createMuiTheme } from '@material-ui/core/styles';

// Example of theme creation
// https://github.com/mui-org/material-ui/issues/1915#issuecomment-310849153

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: '#8bc34a',
    body1: {
      lineHeight: `1.5rem`,
    },
    display1: {
      // fontSize: 60,
    },
  },
  palette: {
    type: 'light',
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#f44336',
    },
  },
  overrides: {
    // MuiFormControl: {
    //   root: {
    //     margin: 10,
    //   },
    // },
    // MuiPaper: {
    //   root: {
    //     padding: '0.125rem 1rem',
    //   },
    // },
    MuiButton: {
      root: {
        'text-transform': 'inherit',
      },
    },
  },
});

export default theme;
