import { APIGatewayEvent, APIGatewayProxyEvent } from "aws-lambda";
import { handler } from "../../services/SpacesTable/Read";

const event: APIGatewayProxyEvent = {
    queryStringParameters: {
        location: "London"
    }
} as any;

handler(event, {} as any).then((apiResult) => {
    const items = JSON.parse(apiResult.body);
    console.log("123");
});
