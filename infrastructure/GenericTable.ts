import { Stack } from 'aws-cdk-lib'
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway'
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

export interface TableProps {
    tableName: string,
    primaryKey: string
    createLambdaPath?: string,
    readLambdaPath?: string, 
    updateLambdaPath?: string,
    deleteLambdaPath?: string,
}

export class GenericTable {
    private stack: Stack
    private table: Table
    private props: TableProps

    private createLambda: NodejsFunction | undefined;
    private readLambda: NodejsFunction | undefined;
    private updateLambda: NodejsFunction | undefined;
    private deleteLambda: NodejsFunction | undefined;

    public createLambdaIntegration: LambdaIntegration; 
    public readLambdaIntegration: LambdaIntegration;
    public updateLambdaIntegration: LambdaIntegration;
    public deleteLambdaIntegration: LambdaIntegration;


    public constructor(stack: Stack, props: TableProps) {
        this.stack = stack
        this.props = props
        this.initialize()
    }

    private initialize(){
        this.createTable()
    }

    private createTable() {
        this.table = new Table(this.stack, this.props.tableName, {
            partitionKey: {
                name: this.props.primaryKey,
                type: AttributeType.STRING
            },
            tableName: this.props.tableName
        })
    }


}