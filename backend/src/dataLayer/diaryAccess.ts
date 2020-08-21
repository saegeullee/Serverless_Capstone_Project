import * as AWS from 'aws-sdk';
// import * as AWSXray from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { UpdateDiaryRequest } from '../requests/UpdateDiaryRequest';
import { Diary } from '../models/Diary';
import { logger } from '../logger/looger';

export class DiaryAccess {
  private readonly docClient: DocumentClient;
  private readonly diaryTable: string;
  constructor(tableName?: any) {
    this.diaryTable = process.env.DIARY_TABLE;
    if (tableName) this.diaryTable = tableName;
    this.docClient = createDynamoDBClient();
  }

  async getDiaries(userId: string): Promise<Diary[]> {
    const result = await this.docClient
      .query({
        TableName: this.diaryTable,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
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

  async updateDiary(userId: string, diaryId: string, updateDiary: UpdateDiaryRequest) {
    await this.docClient
      .update({
        TableName: this.diaryTable,
        Key: {
          userId,
          diaryId
        },
        UpdateExpression: 'set content= :content',
        ExpressionAttributeValues: {
          ':content': updateDiary.content
        }
      })
      .promise();
  }

  async deleteDiary(userId: string, diaryId: string) {
    await this.docClient
      .delete({
        TableName: this.diaryTable,
        Key: {
          userId,
          diaryId
        }
      })
      .promise();
  }
}

function createDynamoDBClient() {
  logger.info('Creating DynamoDB Client..');

  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance');
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8001'
    });
  }
  // const XAWS = AWSXray.captureAWS(AWS);
  // return new XAWS.DynamoDB.DocumentClient();
  return new AWS.DynamoDB.DocumentClient();
}
