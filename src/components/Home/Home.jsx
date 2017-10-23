import React from 'react';

import Chip from './../Chip/Chip';

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <Chip title="Number" icon="https://echaloasuerte.com/static/img/draw_icons/raffle.ecc02d7cd162.png" href="/number"></Chip>
      <Chip title="Card" icon="https://echaloasuerte.com/static/img/draw_icons/cards.dd13da9485a7.png" href="/card"></Chip>
    </div>
  );
};

export default Home;
