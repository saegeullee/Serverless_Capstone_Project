// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'o2vobhfhmd'
export const apiEndpoint = `https://${apiId}.execute-api.ap-northeast-2.amazonaws.com/dev`
// export const apiEndpoint = `http://localhost:3005/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-k68389gq.us.auth0.com', // Auth0 domain
  clientId: 'VBL1Nvb27GA2hx98GbQBmNusToizgEoh', // Auth0 client id
  callbackUrl: 'http://49.247.207.38/callback'
}
