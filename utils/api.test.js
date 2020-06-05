// import { RandomNumberApi, LetterApi, Letter, DrawTossPayload } from 'echaloasuerte-js-sdk';
import { fetchDraw, toss } from './api';
import { URL_SLUG_LETTER } from '../constants/urlSlugs';

const mockCreate = jest.fn();
const mockRead = jest.fn();
jest.mock('echaloasuerte-js-sdk', () => ({
  ...jest.requireActual('echaloasuerte-js-sdk'),
  LetterApi: jest
    .fn()
    .mockImplementation(() => ({ letterCreate: mockCreate, letterRead: mockRead })),
  // RandomNumber: { constructFromObject: jest.fn().mockReturnValue(4) },
}));

const mockDate = new Date('1995-12-17T03:24:00');

// const { RandomNumber } = jest.requireActual('echaloasuerte-js-sdk');
describe('Api', () => {
  it('Should fetch draw correctly', async () => {
    const mockResponse = {
      id: '728efbc2-4d54-4702-98dd-f2cd18cbaa52',
      created_at: mockDate,
      updated_at: mockDate,
      title: null,
      description: null,
      private_id: 'd7b5c0f9-8c76-4369-91bf-4eedd684b7b1',
      metadata: [{ client: 'web', key: 'isQuickDraw', value: 'true' }],
      number_of_results: 1,
      allow_repeated_results: false,
      results: [
        {
          created_at: mockDate,
          schedule_date: null,
          value: [Array],
        },
      ],
    };
    mockRead.mockResolvedValue(mockResponse);
    const urlSlug = URL_SLUG_LETTER;
    const drawId = '12345';

    await fetchDraw({ urlSlug, drawId });
    expect(mockRead).toHaveBeenCalledWith(drawId);
  });

  it('Should toss draw correctly', async () => {
    const mockValues = {
      title: 'Sorteo público',
      description: '',
      numberOfResults: '2',
      allowRepeated: true,
      dateScheduled: new Date('1995-12-17T03:24:00'),
    };

    const tossObject = {
      values: mockValues,
      privateId: null,
      urlSlug: URL_SLUG_LETTER,
      setLoadingRequest: jest.fn(),
      track: jest.fn(),
      setAPIError: jest.fn(),
      setQuickResult: jest.fn(),
    };

    const expectedValue = {
      allow_repeated_results: true,
      description: null,
      metadata: [{ client: 'web', key: 'isQuickDraw', value: 'true' }],
      number_of_results: 2,
      title: null,
    };

    await toss(tossObject);
    expect(mockCreate).toHaveBeenCalledWith(expectedValue);
    // expect(tossSpy).toHaveBeenCalledWith(drawId);
  });
});
