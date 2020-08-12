import { DiaryAccess } from '../../src/dataLayer/diaryAccess';
import { Diary } from '../../src/models/Diary';

const diaries: Diary[] = [
  {
    // userId: 'user-id',
    diaryId: 'diary-id',
    createdAt: '2020-08-15',
    content: 'diary content'
  }
];

const getPromise = jest.fn();
const createPromise = jest.fn();

const dynamoDbClient: any = {
  scan: jest.fn(() => {
    return {
      promise: getPromise
    };
  }),
  put: jest.fn(() => {
    return {
      promise: createPromise
    };
  })
};

const diaryAccess = new DiaryAccess(dynamoDbClient);

describe('testing dataLayer..', () => {
  it('should return a diaries', async () => {
    getPromise.mockResolvedValue({
      Items: diaries
    });

    const result = await diaryAccess.getDiaries();

    expect(result).toEqual(diaries);
  });

  it('should create new diary', async () => {
    createPromise.mockResolvedValue({
      Item: diaries[0]
    });

    const newDiary = await diaryAccess.createDiary({ ...diaries[0] });

    expect(newDiary).toEqual(diaries[0]);
  });
});
