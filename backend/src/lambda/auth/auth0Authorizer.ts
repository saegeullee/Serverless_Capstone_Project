import 'source-map-support/register';
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { verify } from 'jsonwebtoken';

import { JwtPayload } from '../../auth/JwtPayload';

const secretId = process.env.AUTH_0_SECRET_ID;
const secretField = process.env.AUTH_0_SECRET_FIELD;

const secretManagerClient = new AWS.SecretsManager();
let cachedSecret;

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    console.log(event.authorizationToken);
    const jwtToken = await verifyToken(event.authorizationToken);

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    };
  } catch (e) {
    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    };
  }
};

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader);
  const secretObject: any = await getSecret();
  const secret = secretObject[secretField];

  return verify(token, secret) as JwtPayload;
}

async function getSecret() {
  // if (cachedSecret) return cachedSecret;

  const data = await secretManagerClient
    .getSecretValue({
      SecretId: secretId
    })
    .promise();

  cachedSecret = data.SecretString;
  return JSON.parse(cachedSecret);
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header');

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header');

  const split = authHeader.split(' ');
  const token = split[1];

  return token;
}
