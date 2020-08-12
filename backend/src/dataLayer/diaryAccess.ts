import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { Diary } from '../models/Diary';

export class DiaryAccess {
  private readonly docClient: DocumentClient;
  private readonly diaryTable: string;
  constructor(dynamoDbClient?: any) {
    this.diaryTable = process.env.DIARY_TABLE;
    if (dynamoDbClient) {
      this.docClient = dynamoDbClient;
      return;
    }
    this.docClient = new AWS.DynamoDB.DocumentClient();
  }

  async getDiaries(): Promise<Diary[]> {
    const result = await this.docClient
      .scan({
        TableName: this.diaryTable
      })
      .promise();

    return result.Items as Diary[];
  }

  async createDiary(newDiary): Promise<Diary> {
    await this.docClient
      .put({
        TableName: this.diaryTable,
        Item: newDiary
      })
      .promise();

    return newDiary;
  }
}
