import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';

import { getImageUploadUrl } from '../../businessLogic/diary';
import { UploadUrlResponse } from '../../responses/UploadUrlResponse';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('current event: ', event);

  const urlResponse: UploadUrlResponse = getImageUploadUrl();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item: urlResponse
    })
  };
};
