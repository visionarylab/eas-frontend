import {
  URL_SLUG_NUMBER,
  URL_SLUG_LETTER,
  URL_SLUG_GROUPS,
  URL_SLUG_RAFFLE,
  URL_SLUG_FACEBOOK,
} from '../../constants/urlSlugs';
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
import {
  getRaffleDrawDataFromValues,
  getRaffleValuesFromDraw,
  getRaffleTranslationFiles,
} from './raffle';
import {
  getFacebookRaffleDrawDataFromValues,
  getFacebookRaffleValuesFromDraw,
  getFacebookRaffleTranslationFiles,
} from './facebookRaffle';

const getDrawByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberDrawDataFromValues,
  [URL_SLUG_LETTER]: getLetterDrawDataFromValues,
  [URL_SLUG_GROUPS]: getGroupsDrawDataFromValues,
  [URL_SLUG_RAFFLE]: getRaffleDrawDataFromValues,
  [URL_SLUG_FACEBOOK]: getFacebookRaffleDrawDataFromValues,
};

const getValuesByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberValuesFromDraw,
  [URL_SLUG_LETTER]: getLetterValuesFromDraw,
  [URL_SLUG_GROUPS]: getGroupsValuesFromDraw,
  [URL_SLUG_RAFFLE]: getRaffleValuesFromDraw,
  [URL_SLUG_FACEBOOK]: getFacebookRaffleValuesFromDraw,
};
const getTranslationByUrlSlug = {
  [URL_SLUG_NUMBER]: getNumberTranslationFiles,
  [URL_SLUG_LETTER]: getLetterTranslationFiles,
  [URL_SLUG_GROUPS]: getGroupsTranslationFiles,
  [URL_SLUG_RAFFLE]: getRaffleTranslationFiles,
  [URL_SLUG_FACEBOOK]: getFacebookRaffleTranslationFiles,
};

export const getDrawDataFromValues = ({ urlSlug, values, isPublic }) =>
  getDrawByUrlSlug[urlSlug]({ values, isPublic });

export const getValuesFromDraw = ({ urlSlug, draw }) => getValuesByUrlSlug[urlSlug]({ draw });

export const getTranslationFiles = ({ urlSlug, isQuickDraw }) =>
  getTranslationByUrlSlug[urlSlug]({ isQuickDraw });
