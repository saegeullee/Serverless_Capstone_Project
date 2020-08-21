# Serverless Diaries

## Functionality of the application

This application is for your daily Diary. You can fetch, write, update, delete the diaries that you've written. You can only access to the diaries that you have written. Others can't access to yours.

## Access Deployed Application

[http://49.247.207.38](http://49.247.207.38/)

## How to run application locally

This application is already deployed so you can access to it with the above url. If you want to run locally, follow as below.

### Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the React application that will interact with the serverless Diary application.

### Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

### Backend Local testing

To run backend unit test and integration test, run the following commands:

```
sls dynamodb install
sls dynamodb start --seed=diaries
npm run test
```
