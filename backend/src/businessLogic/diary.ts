import { DiaryAccess } from '../dataLayer/diaryAccess';
import { Diary } from '../models/Diary';
import * as uuid from 'uuid';

const diaryAccess = new DiaryAccess();

export const getDiaries = async function(): Promise<Diary[]> {
  return await diaryAccess.getDiaries();
};

export const createDiary = async function(newDiaryRequest): Promise<Diary> {
  const diaryId = uuid.v4();
  const newDiary: Diary = {
    ...newDiaryRequest,
    diaryId,
    createdAt: new Date().toLocaleDateString()
  };

  return await diaryAccess.createDiary(newDiary);
};
