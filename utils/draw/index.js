import { URL_SLUG_NUMBER, URL_SLUG_LETTER } from '../../constants/urlSlugs';
import {
  getNumberDrawDataFromValues,
  getNumberValuesFromDraw,
  getNumberTranslationFiles,
} from './number';
import {
  getLetterDrawDataFromValues,
  getLetterValuesFromDraw,
  getLetterTranslationFiles,
} from './letter';

const getDrawByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberDrawDataFromValues,
  [URL_SLUG_LETTER]: getLetterDrawDataFromValues,
};

const getValuesByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberValuesFromDraw,
  [URL_SLUG_LETTER]: getLetterValuesFromDraw,
};
const getTranslationByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberTranslationFiles,
  [URL_SLUG_LETTER]: getLetterTranslationFiles,
};

export const getDrawDataFromValues = ({ urlSlug, values, isPublic }) =>
  getDrawByUrlSlug[urlSlug]({ values, isPublic });

export const getValuesFromDraw = ({ urlSlug, draw }) => getValuesByUrlSlug[urlSlug]({ draw });

export const getTranslationFiles = ({ urlSlug, isQuickDraw }) =>
  getTranslationByUrlSlug[urlSlug]({ isQuickDraw });
