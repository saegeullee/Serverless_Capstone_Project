import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { DiaryAccess } from '../dataLayer/diaryAccess';
import { Diary } from '../models/Diary';

import { UploadUrlResponse } from '../responses/UploadUrlResponse';

const s3 = new AWS.S3({ signatureVersion: 'v4' });
const diaryAccess = new DiaryAccess();

const bucketName = process.env.IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

export const getDiaries = async function(): Promise<Diary[]> {
  return await diaryAccess.getDiaries();
};

export const createDiary = async function(newDiaryRequest): Promise<Diary> {
  const diaryId = uuid.v4();
  const newDiary: Diary = {
    ...newDiaryRequest,
    diaryId,
    createdAt: new Date().toLocaleDateString(),
    imageUrl: newDiaryRequest.imageUrl
  };

  return await diaryAccess.createDiary(newDiary);
};

export const getImageUploadUrl = (): UploadUrlResponse => {
  const imageId = uuid.v4();

  const url = s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: imageId,
    Expires: Number(urlExpiration)
  });

  const imageUrl = `http://${bucketName}.s3.amazonaws.com/${imageId}`;

  return {
    url,
    imageUrl
  };
};
