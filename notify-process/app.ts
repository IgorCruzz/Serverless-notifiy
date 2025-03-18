import { SQSEvent } from 'aws-lambda';

import { SnsService } from './services/sns-services';
import { DynamoDBService } from './services/dynamodb-services';

export const handler = async (event: SQSEvent): Promise<void> => {
    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);
            const message = JSON.parse(body.Message);

            await DynamoDBService.putItem({
                message: message.message,
                priority: message.priority,
                userId: message.userId,
            });

            await SnsService.publishMessage({
                message: message.message,
                priority: message.priority,
            });

            console.log('Notificação was saved succesfully', message);
        } catch (error) {
            throw error;
        }
    }
};
