import { DiaryAccess } from '../../src/dataLayer/diaryAccess';
import { Diary } from '../../src/models/Diary';

const diaries: Diary[] = [
  {
    userId: 'user-id',
    diaryId: 'diary-id',
    createdAt: '2020-08-15',
    content: 'diary content'
  }
];

const diaryAccess = new DiaryAccess('DIARY-dev');

describe('testing dataLayer..', () => {
  it('should create new diary', async () => {
    const newDiary = await diaryAccess.createDiary({ ...diaries[0] });
    expect(newDiary).toEqual(diaries[0]);
  });

  it('should return a diaries', async () => {
    const result = await diaryAccess.getDiaries('user-id');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].userId).toBe('user-id');
    expect(result[0]).toHaveProperty('content');
    expect(result[0]).toHaveProperty('diaryId');
    expect(result[0]).toHaveProperty('userId');
  });
});
