import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary1Color: '#2196f3',
    primary: purple, // Purple and green play nicely together.
    secondary: {
      ...purple,
      A400: '#00e677',
    },
    error: green,
  },
  // overrides: {
  //   MuiFormControl: {
  //     root: {
  //       margin: 8,
  //     },
  //   },
  //   MuiButton: {
  //     root: {
  //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //       borderRadius: 3,
  //       border: 0,
  //       color: red,
  //       height: 48,
  //       padding: '0 30px',
  //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  //     },
  //   },
  // },
});

export default theme;
