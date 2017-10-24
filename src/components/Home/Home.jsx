import React from 'react';
import Grid from 'material-ui/Grid';

import Chip from './../Chip/Chip';

const Home = (props) => {
  console.log(props);
  return (
    <Grid container justify="center">
      <Grid item sm={4}>
        <Chip title="Number" icon="https://echaloasuerte.com/static/img/draw_icons/raffle.ecc02d7cd162.png" href="/number"></Chip>
      </Grid>
      <Grid item sm={4}>
        <Chip title="Card" icon="https://echaloasuerte.com/static/img/draw_icons/cards.dd13da9485a7.png" href="/card"></Chip>
      </Grid>
    </Grid>
  );
};

export default Home;
