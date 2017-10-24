import { createMuiTheme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple, // Purple and green play nicely together.
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: green,
  },
});

export default theme;
