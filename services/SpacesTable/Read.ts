import {
    APIGatewayProxyEvent,
    APIGatewayProxyEventQueryStringParameters,
    APIGatewayProxyResult,
    Context
} from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;
const dbClient = new DynamoDB.DocumentClient({
    region: "us-east-1"
});

const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    const result: APIGatewayProxyResult = {
        statusCode: 200,
        body: "hello from dynamodb"
    };
    try {
        if (event.queryStringParameters) {
            if (PRIMARY_KEY! in event.queryStringParameters) {
                result.body = await queryWithPrimaryPartion(
                    event.queryStringParameters
                );
            } else {
                result.body = await queryWithSecondaryPartion(
                    event.queryStringParameters
                );
            }
        } else {
            result.body = await scanTable();
        }
    } catch (error) {
        result.body = JSON.stringify(error);
    }

    return result;
};

const queryWithSecondaryPartion = async (
    queryParams: APIGatewayProxyEventQueryStringParameters
) => {
    const queryKey = Object.keys(queryParams)[0];
    const queryValue = queryParams[queryKey];
    const queryResponse = await dbClient
        .query({
            TableName: TABLE_NAME!,
            IndexName: queryKey,
            KeyConditionExpression: "#zz = :zzzz",
            ExpressionAttributeNames: {
                "#zz": queryKey
            },
            ExpressionAttributeValues: {
                ":zzzz": queryValue
            }
        })
        .promise();
    return JSON.stringify(queryResponse.Items);
};

const queryWithPrimaryPartion = async (
    queryParams: APIGatewayProxyEventQueryStringParameters
) => {
    const keyValue = queryParams[PRIMARY_KEY!];
    const queryResponse = await dbClient
        .query({
            TableName: TABLE_NAME!,
            KeyConditionExpression: "#zz = :zzzz",
            ExpressionAttributeNames: {
                "#zz": PRIMARY_KEY!
            },
            ExpressionAttributeValues: {
                ":zzzz": keyValue
            }
        })
        .promise();
    return JSON.stringify(queryResponse);
};

const scanTable = async () => {
    const queryResponse = await dbClient
        .scan({
            TableName: TABLE_NAME!
        })
        .promise();
    return JSON.stringify(queryResponse.Items);
};

export { handler };
