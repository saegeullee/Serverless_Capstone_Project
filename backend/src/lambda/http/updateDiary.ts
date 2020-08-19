import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';

import DiaryBusinessLogicInstanceGetter from '../../businessLogic/diary';
import { Responses } from '../../common/API_Responses';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // console.log('event : ', event);

  if (!event.headers.Authorization) {
    return Responses._400({ message: 'Authorization header empty' });
  }

  if (!event.pathParameters.diaryId) {
    return Responses._400({ message: 'diaryId must be specified in the path' });
  }

  const userId = getUserId(event);
  const diaryId = event.pathParameters.diaryId;
  const updateDiaryRequest = JSON.parse(event.body);

  await DiaryBusinessLogicInstanceGetter().updateDiary(userId, diaryId, updateDiaryRequest);

  return Responses._200({ message: 'updated successfully' });
};
