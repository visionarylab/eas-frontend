// *************************************************************
//                        Raffle Draw
// *************************************************************

export const tossRaffleDraw = (
  title,
  description,
  participants,
  numberOfWinners,
  whenResultsShow,
  dateResultsShown,
) => {
  const results = [];

  while (results.size < numberOfWinners) {
    const winner = participants[Math.floor(Math.random() * participants.length)];
    results.push(winner);
  }

  const draw = {
    id: '123_raffle',
    setup: {
      title,
      description,
      participants,
      numberOfWinners,
      whenResultsShow,
      dateResultsShown,
    },
    results,
  };
  return draw;
};

export const publishRaffleDraw = () => {
  // Call the API to publish the draw
  const draw = {
    id: '123_raffle',
  };
  return draw;
};

export const getRaffleDraw = drawId => ({
  drawId,
  title: 'Sorteo de Navidad',
  description: 'This is for bla bla',
  participants: ['david', 'pedro', 'mario'],
  numberOfWinners: 2,
  prizes: ['PS4'],
  results: [
    {
      position: 1,
      winnerName: 'David',
      prize: 'PS4',
    },
    {
      position: 2,
      winnerName: 'Pedro',
      prize: 'Xbox',
    },
  ],
});

// *************************************************************
//                        Number Draw
// *************************************************************

export const publishNumberDraw = (from, to, numberOfResults, allowRepeated) => {
  const draw = {
    id: '0000000001',
    setup: {
      from,
      to,
      numberOfResults,
      allowRepeated,
    },
  };
  return draw;
};

export const tossNumberDraw = (from, to, numberOfResults, allowRepeated) => {
  let results = [];
  if (allowRepeated) {
    while (results.size < numberOfResults) {
      results.push(Math.floor(Math.random() * (to - from + 1)) + from);
    }
  } else {
    results = new Set();
    while (results.size < numberOfResults) {
      results.add(Math.floor(Math.random() * (to - from + 1)) + from);
    }
    results = Array.from(results);
  }

  const draw = {
    id: '0000000001',
    setup: {
      from,
      to,
      numberOfResults,
      allowRepeated,
    },
    results,
  };
  return draw;
};

export const getNumberDraw = drawId =>
  drawId
    ? {
        title: 'Sorteo de Navidad',
        from: 0,
        to: 10,
        numberOfResults: 1,
        allowRepeated: false,
        results: [2, 6],
      }
    : '';

// *************************************************************
//                        Letter Draw
// *************************************************************

export const tossLetterDraw = numberOfResults => {
  const alphabet = ['a', 'b', 'c'];
  const results = new Set();
  while (results.size < numberOfResults) {
    results.add(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  return Array.from(results);
};
