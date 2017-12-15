const translations = require.context("./", true, /\.\/(\w+-\w+)\.js$/)

export default translations.keys()
  .reduce(
    (acc, item) => ({
      ...acc,
      [item.replace(/\.\/(\w+-\w+)\.js$/, "$1")]: true,
    }),
    {}
  )
