import { SQSEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: SQSEvent): Promise<void> => {
    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);
            const message = JSON.parse(body.Message);

            const params: PutCommandInput = {
                TableName: process.env.DYNAMODB_TABLE_NAME,
                Item: {
                    ID: String(message.userId),
                    Message: message.message,
                    Priority: message.priority,
                },
                ConditionExpression: 'attribute_not_exists(ID)',
            };

            console.log({ params });

            const command = new PutCommand(params);

            await docClient.send(command);
        } catch (error) {
            throw error;
        }
    }
};
