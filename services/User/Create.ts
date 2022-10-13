import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient({
    region: 'us-east-1'
})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body:'hello from dynamodb'
    }

    const item = typeof event.body === 'object' ? event.body : JSON.parse(event.body)
    item.userId = v4()

        
    result.body = JSON.stringify(`Created with id: ${item.userId}`)

    await dbClient.put({
            TableName: TABLE_NAME!,
            Item: item
        }).promise()

    return result
}

export {handler}