import { createMuiTheme } from 'material-ui/styles';
import {Colors, Spacing} from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: green, // Purple and green play nicely together.
    secondary: {
      ...purple,
      A400: '#00e677',
    },
    error: green,
  },
  overrides:{
    MuiFormControl: {
      root: {
        // Name of the rule
        margin: 8,
      },
    },
  }
});

export default theme;
