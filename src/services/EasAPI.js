const baseUrl = 'https://echaloasuerte.com/api/v1/';

export const createDraw = () => {
  const url = `${baseUrl}draw/`;
  const body = {
    is_shared: false,
    id: '',
    number_of_results: 1,
    range_max: 10,
    range_min: 3,
    title: 'Número Aleatorio',
    type: 'number',
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    mode: 'no-cors',
  })
    .then(response => console.log(response))
    .catch(err => console.log(err));
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

export const tossRaffleDraw = (from, to, numberOfResults, allowRepeated) => {
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


export const createPublicNumberDraw = (from, to, numberOfResults, allowRepeated) => {
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

export const tossLetterDraw = numberOfResults => {
  const alphabet = ['a', 'b', 'c'];
  const results = new Set();
  while (results.size < numberOfResults) {
    results.add(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  return Array.from(results);
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
