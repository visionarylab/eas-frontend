import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
    error: green,
  },
  overrides: {
    MuiFormControl: {
      root: {
        margin: 10,
      },
    },
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
