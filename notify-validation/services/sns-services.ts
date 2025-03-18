import { PublishCommand, PublishCommandInput, SNSClient } from '@aws-sdk/client-sns';
import { NotifyType } from '../schemas';

const snsClient = new SNSClient({});

export const NotifyRepository = {
    publishMessage: async (data: NotifyType) => {
        const publishCommandInput: PublishCommandInput = {
            TopicArn: process.env.SNS_TOPIC_ARN,
            Message: JSON.stringify({
                userId: data.userId,
                message: data.message,
                priority: data.priority,
            }),
            MessageAttributes: {
                priority: {
                    DataType: 'String',
                    StringValue: data.priority,
                },
            },
        };

        const publishCommand = new PublishCommand(publishCommandInput);

        await snsClient.send(publishCommand);
    },
};
