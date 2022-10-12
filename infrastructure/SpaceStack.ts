import {Stack, StackProps} from 'aws-cdk-lib'
import { Construct } from 'constructs';
import {Code, Function as LambdaFunction, Runtime} from 'aws-cdk-lib/aws-lambda'
import {join} from 'path'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class SpaceStack extends Stack {

    private api = new RestApi(this, 'SpaceFinderApi')
    private spaceTable = new GenericTable('SpacesTable', 'spaceId', this)

    constructor(scope: Construct, id: string,  props: StackProps){
        super(scope, id, props)

        const helloLambdaNodejs = new NodejsFunction(this, 'helloLambdaNodeJs', {
            entry: (join(__dirname, '..', 'services', 'node-lambda', 'hello.ts')),
            handler: 'handler'
        })

        //Hello Lambda API integration
        const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodejs)
        const helloLambdaResource = this.api.root.addResource('hello')
        helloLambdaResource.addMethod('GET', helloLambdaIntegration)

    }

}