import { APIGatewayEvent, APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Read';

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        spaceId: '6898f0dd-7bcb-4bf6-8c03-61e9e2192def'
    }
} as any



handler(event, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body)
    console.log('123')
});