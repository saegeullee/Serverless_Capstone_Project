import 'source-map-support/register';

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { createDiary } from '../../businessLogic/diary';
import { CreateDiaryRequest } from '../../requests/CreateDiaryRequest';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('current event: ', event);

  const userId = getUserId(event);
  const newDiaryRequest: CreateDiaryRequest = JSON.parse(event.body);
  const newDiary = await createDiary(userId, newDiaryRequest);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: newDiary
    })
  };
};
