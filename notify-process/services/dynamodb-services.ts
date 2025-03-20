import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { NotifyType } from '../types';
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const DynamoDBService = {
    putItem: async (message: NotifyType) => {
        const params: PutCommandInput = {
            TableName: process.env.DYNAMODB_TABLE_NAME,
            Item: {
                ID: String(message.userId),
                Message: message.message,
                Priority: message.priority,
            },
            ConditionExpression: 'attribute_not_exists(ID)',
        };

        const command = new PutCommand(params);

        await docClient.send(command);
    },
};
