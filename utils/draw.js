import { URL_SLUG_NUMBER } from '../constants/urlSlugs';

const getBaseFields = ({ values, isPublic }) => {
  const { title, description } = values;
  return {
    title: isPublic && title ? title : null,
    description: isPublic && description ? description : null,
    metadata: [{ client: 'web', key: 'isQuickDraw', value: !isPublic }],
  };
};

const getNumberDrawFromValues = ({ values, isPublic }) => {
  const baseFields = getBaseFields({ values, isPublic });
  const { rangeMin, rangeMax, numberOfResults, allowRepeated } = values;
  return {
    ...baseFields,
    range_min: rangeMin,
    range_max: rangeMax,
    number_of_results: numberOfResults,
    allow_repeated_results: allowRepeated,
  };
};

const getDrawByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberDrawFromValues,
};

// eslint-disable-next-line import/prefer-default-export
export const getDrawDataFromValues = ({ urlSlug, values, isPublic }) =>
  getDrawByUrlSlug[urlSlug]({ values, isPublic });
