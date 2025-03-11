import { SQSEvent } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { SNSClient, PublishCommand, PublishCommandInput } from '@aws-sdk/client-sns';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const snsClient = new SNSClient({});

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

            const command = new PutCommand(params);

            await docClient.send(command);

            const publishParams: PublishCommandInput = {
                TopicArn: process.env.SNS_TOPIC_ARN,
                Subject: `Notification (${body.priority})`,
                Message: JSON.stringify({
                    message: body.message,
                    priority: body.priority,
                }),
            };

            const publishCommand = new PublishCommand(publishParams);

            await snsClient.send(publishCommand);

            console.log('Notificação was saved succesfully', message);
        } catch (error) {
            throw error;
        }
    }
};
