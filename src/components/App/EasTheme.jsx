import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    color: green,
    body1: {
      lineHeight: `1.5rem`,
    },
  },
  palette: {
    primary: purple,
    secondary: green,
    error: green,
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
