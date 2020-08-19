import DiaryBusinessLogicInstanceGetter from '../../src/businessLogic/diary';

const diaryBusinessLogic = DiaryBusinessLogicInstanceGetter('DIARY-dev');

describe('testing businessLogic..', () => {
  it('should create new diary', async () => {
    const createDiaryRequest = {
      content: 'diary content'
    };
    const result = await diaryBusinessLogic.createDiary('user-id', createDiaryRequest);
    expect(result.userId).toBe('user-id');
    expect(result.content).toBe(createDiaryRequest.content);
    expect(result).toHaveProperty('diaryId');
  });

  it('should return a diaries', async () => {
    const result = await diaryBusinessLogic.getDiaries('user-id');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].userId).toBe('user-id');
    expect(result[0]).toHaveProperty('content');
    expect(result[0]).toHaveProperty('diaryId');
    expect(result[0]).toHaveProperty('userId');
  });

  it('should update diary', async () => {
    const beforeDiaries = await diaryBusinessLogic.getDiaries('user-id');
    const sampleBeforeDiary = beforeDiaries[0];

    const updateDiary = { content: 'content updated' };
    await diaryBusinessLogic.updateDiary('user-id', sampleBeforeDiary.diaryId, updateDiary);

    const afterDiaries = await diaryBusinessLogic.getDiaries('user-id');
    const sampleAfterDiary = afterDiaries.filter(e => e.diaryId === sampleBeforeDiary.diaryId)[0];

    expect(sampleAfterDiary.content).toBe(updateDiary.content);
  });

  it('should delete diary', async () => {
    const beforeDiaries = await diaryBusinessLogic.getDiaries('user-id');
    const sampleBeforeDiary = beforeDiaries[0];
    await diaryBusinessLogic.deleteDiary('user-id', sampleBeforeDiary.diaryId);

    const afterDiaries = await diaryBusinessLogic.getDiaries('user-id');
    const sampleAfterDiary = afterDiaries.filter(e => e.diaryId === sampleBeforeDiary.diaryId);
    expect(sampleAfterDiary.length).toBe(0);
  });
});
