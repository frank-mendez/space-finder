import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient({
    region: 'us-east-1'
})

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body:'hello from dynamodb'
    }

    try {
        const queryResponse = await dbClient.scan({
            TableName: TABLE_NAME!,
        }).promise()
        result.body = JSON.stringify(queryResponse)
    } catch (error) {
        result.body = JSON.stringify(error)
    }

    return result
}

export {handler}