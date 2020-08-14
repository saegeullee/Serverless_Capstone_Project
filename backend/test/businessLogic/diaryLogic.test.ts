import { DiaryAccess } from '../../src/dataLayer/diaryAccess';
import { getDiaries, createDiary } from '../../src/businessLogic/diary';
import { Diary } from '../../src/models/Diary';

jest.mock('../../src/dataLayer/diaryAccess');

const diaries: Diary[] = [
  {
    userId: 'user-id',
    diaryId: 'diary-id',
    createdAt: '2020-08-15',
    content: 'diary content'
  }
];

const diaryAccessInstance = (DiaryAccess as any).mock.instances[0];

describe('testing businessLogic..', () => {
  it('should return a diaries', async () => {
    diaryAccessInstance.getDiaries.mockResolvedValue(diaries);
    const result = await getDiaries('user-id');
    expect(result).toEqual(diaries);
  });

  it('should create new diary', async () => {
    const createDiaryRequest = {
      content: 'diary content'
    };
    diaryAccessInstance.createDiary.mockResolvedValue(diaries[0]);
    const result = await createDiary('user-id', createDiaryRequest);
    expect(result).toEqual(diaries[0]);
  });
});
