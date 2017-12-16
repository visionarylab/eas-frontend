import React from 'react';
import Grid from 'material-ui/Grid';

import Chip from './../DrawCard/DrawCard';

const Home = () => (
  <Grid container justify="center">
    <Grid item sm={4}>
      <Chip icon="https://echaloasuerte.com/static/img/draw_icons/raffle.ecc02d7cd162.png" href="/number">Number</Chip>
    </Grid>
    <Grid item sm={4}>
      <Chip icon="https://echaloasuerte.com/static/img/draw_icons/random_letter.07b9689f39d4.png" href="/letter">Letter</Chip>
    </Grid>
  </Grid>
  );

export default Home;
