const translations = require.context('./translations/', true, /\.\/(\w+)\.js$/);
// debugger
console.log(translations.keys());
export default translations.keys().reduce(
  (acc, item) => ({
    ...acc,
    [item.replace(/\.\/(\w+)\.js$/, '$1')]: true,
  }),
  {},
);
