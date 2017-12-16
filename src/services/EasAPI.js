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
  }).then(response => console.log(response))
    .catch(err => console.log(err));
};

export const tossNumberDraw = (from, to, numberOfResults, allowRepeated) => {
  let results = [];
  if (allowRepeated) {
    while (results.size < numberOfResults) {
      results.push(Math.floor(Math.random() * ((to - from) + 1)) + from);
    }
  } else {
    results = new Set();
    while (results.size < numberOfResults) {
      results.add(Math.floor(Math.random() * ((to - from) + 1)) + from);
    }
    results = Array.from(results);
  }
  return results;
};

