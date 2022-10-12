import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

const s3Client = new S3()

async function handler(event:any){
    console.log('got an event', event)
    const buckets = await s3Client.listBuckets().promise()
    return {
        statusCode: 200,
        body: 'Here are your buckets ' + JSON.stringify(buckets)
    }
}

export {handler}