import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { updateDiary } from '../../businessLogic/diary';
import { getUserId } from '../utils';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('event : ', event);
  const userId = getUserId(event);
  const diaryId = event.pathParameters.diaryId;
  const updateDiaryRequest = JSON.parse(event.body);

  await updateDiary(userId, diaryId, updateDiaryRequest);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      msg: 'updated successfully'
    })
  };
};
