import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { deleteDiary } from '../../businessLogic/diary';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('event : ', event);
  const userId = getUserId(event);
  const diaryId = event.pathParameters.diaryId;

  await deleteDiary(userId, diaryId);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      msg: 'deleted successfully'
    })
  };
};
