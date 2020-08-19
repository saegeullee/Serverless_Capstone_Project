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

  const userId = getUserId(event);
  const diaryId = event.pathParameters.diaryId;

  await DiaryBusinessLogicInstanceGetter().deleteDiary(userId, diaryId);

  return Responses._200({ message: 'deleted successfully' });
};
