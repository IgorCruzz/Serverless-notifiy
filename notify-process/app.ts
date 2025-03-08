import { SQSEvent } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: SQSEvent): Promise<void> => {
    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);

            console.log('Processing message', body);

            const parmas: PutItemCommandInput = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Item: {
                    ID: body.userId,
                    Message: body.message,
                    Priority: body.priority,
                },
                ConditionExpression: 'attribute_not_exists(ID)',
            };

            const command = new PutItemCommand(parmas);

            await docClient.send(command);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};
