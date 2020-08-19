import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';

import DiaryBusinessLogicInstanceGetter from '../../businessLogic/diary';
import { Responses } from '../../common/API_Responses';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // console.log('current event: ', event);

  if (!event.headers.Authorization) {
    return Responses._400({ message: 'Authorization header empty' });
  }

  const userId = getUserId(event);
  const items = await DiaryBusinessLogicInstanceGetter().getDiaries(userId);

  return Responses._200({ items });
};
