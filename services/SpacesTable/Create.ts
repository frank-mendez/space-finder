import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS = require('aws-sdk');
import { v4 } from 'uuid';

const dbClient = new AWS.DynamoDB.DocumentClient()

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body:'hello from dynamodb'
    }

    const item = {
        spaceId: v4()
    }

    try {
        await dbClient.put({
            TableName: 'SpacesTable',
            Item: item
        })
    } catch (error) {
        result.body =  `${error}`
    }

    return result
}

export {handler}