import { v4 } from 'uuid';

async function handler(event:any){
    console.log('got an event', event)
    return {
        statusCode: 200,
        body: 'hello from lambda' + v4()
    }
}

export {handler}