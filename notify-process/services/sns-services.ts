import { PublishCommand, PublishCommandInput, SNSClient } from '@aws-sdk/client-sns';
import { NotifyType } from '../types';
const snsClient = new SNSClient({});

export const SnsService = {
    publishMessage: async (data: Omit<NotifyType, 'userId'>) => {
        const publishParams: PublishCommandInput = {
            TopicArn: process.env.SNS_TOPIC_ARN,
            Subject: `Notification (${data.priority})`,
            Message: JSON.stringify({
                message: data.message,
                priority: data.priority,
            }),
        };

        const publishCommand = new PublishCommand(publishParams);

        await snsClient.send(publishCommand);
    },
};
