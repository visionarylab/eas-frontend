import { URL_SLUG_NUMBER } from '../../constants/urlSlugs';
import { getNumberDrawFromValues, getNumberValuesFromDraw } from './number';

const getDrawByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberDrawFromValues,
};

const getValuesByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberValuesFromDraw,
};
// eslint-disable-next-line import/prefer-default-export
export const getDrawDataFromValues = ({ urlSlug, values, isPublic }) =>
  getDrawByUrlSlug[urlSlug]({ values, isPublic });

export const getValuesFromDraw = ({ urlSlug, draw }) => getValuesByUrlSlug[urlSlug]({ draw });
