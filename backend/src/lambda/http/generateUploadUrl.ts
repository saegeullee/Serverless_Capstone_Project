import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';

import DiaryBusinessLogicInstanceGetter from '../../businessLogic/diary';
import { UploadUrlResponse } from '../../responses/UploadUrlResponse';
import { Responses } from '../../common/API_Responses';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('current event: ', event);

  const urlResponse: UploadUrlResponse = DiaryBusinessLogicInstanceGetter().getImageUploadUrl();
  return Responses._200({ item: urlResponse });
};
