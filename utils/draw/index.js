import { URL_SLUG_NUMBER, URL_SLUG_LETTER, URL_SLUG_GROUPS } from '../../constants/urlSlugs';
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

import {
  getGroupsDrawDataFromValues,
  getGroupsValuesFromDraw,
  getGroupsTranslationFiles,
} from './groups';

const getDrawByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberDrawDataFromValues,
  [URL_SLUG_LETTER]: getLetterDrawDataFromValues,
  [URL_SLUG_GROUPS]: getGroupsDrawDataFromValues,
};

const getValuesByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberValuesFromDraw,
  [URL_SLUG_LETTER]: getLetterValuesFromDraw,
  [URL_SLUG_GROUPS]: getGroupsValuesFromDraw,
};
const getTranslationByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberTranslationFiles,
  [URL_SLUG_LETTER]: getLetterTranslationFiles,
  [URL_SLUG_GROUPS]: getGroupsTranslationFiles,
};

export const getDrawDataFromValues = ({ urlSlug, values, isPublic }) =>
  getDrawByUrlSlug[urlSlug]({ values, isPublic });

export const getValuesFromDraw = ({ urlSlug, draw }) => getValuesByUrlSlug[urlSlug]({ draw });

export const getTranslationFiles = ({ urlSlug, isQuickDraw }) =>
  getTranslationByUrlSlug[urlSlug]({ isQuickDraw });
