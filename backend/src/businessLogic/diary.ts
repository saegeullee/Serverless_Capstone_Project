import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { DiaryAccess } from '../dataLayer/diaryAccess';
import { Diary } from '../models/Diary';

import { UploadUrlResponse } from '../responses/UploadUrlResponse';

class DiaryBusinessLogic {
  private static instance: DiaryBusinessLogic;
  private readonly diaryAccess: DiaryAccess;
  private readonly s3: AWS.S3;
  private readonly bucketName: string;
  private readonly urlExpiration: string;

  constructor(tableName?: string) {
    this.s3 = new AWS.S3({ signatureVersion: 'v4' });
    this.bucketName = process.env.IMAGES_S3_BUCKET;
    this.urlExpiration = process.env.SIGNED_URL_EXPIRATION;
    if (tableName) {
      this.diaryAccess = new DiaryAccess(tableName);
      return;
    }
    this.diaryAccess = new DiaryAccess();
  }

  static getInstance(tableName?: string) {
    if (DiaryBusinessLogic.instance) {
      return this.instance;
    }
    this.instance = new DiaryBusinessLogic(tableName);
    return this.instance;
  }

  async getDiaries(userId: string): Promise<Diary[]> {
    return await this.diaryAccess.getDiaries(userId);
  }

  async createDiary(userId: string, newDiaryRequest): Promise<Diary> {
    const diaryId = uuid.v4();
    const newDiary: Diary = {
      ...newDiaryRequest,
      diaryId,
      userId,
      createdAt: new Date().toLocaleDateString(),
      imageUrl: newDiaryRequest.imageUrl
    };

    return await this.diaryAccess.createDiary(newDiary);
  }

  async updateDiary(userId: string, diaryId: string, updateDiary) {
    return await this.diaryAccess.updateDiary(userId, diaryId, updateDiary);
  }

  async deleteDiary(userId: string, diaryId: string) {
    return await this.diaryAccess.deleteDiary(userId, diaryId);
  }

  getImageUploadUrl(): UploadUrlResponse {
    const imageId = uuid.v4();

    const url = this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: imageId,
      Expires: Number(this.urlExpiration)
    });

    const imageUrl = `http://${this.bucketName}.s3.amazonaws.com/${imageId}`;

    return {
      url,
      imageUrl
    };
  }
}

export default function DiaryBusinessLogicInstanceGetter(tableName?: string) {
  return DiaryBusinessLogic.getInstance(tableName);
}
